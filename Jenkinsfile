pipeline {
    agent any

    options {
        timestamps()
    }

    environment {
        REGISTRY     = "ghcr.io/teamdotcodevs/cronospace"
        IMAGE_TAG    = "latest"
        CACHE_TAG    = "buildcache"

        DEPLOY_HOST  = "72.62.228.151"
        DEPLOY_USER  = "crono"
        DEPLOY_PATH  = "/home/crono/cronospace-frontend"
    }

    stages {

        stage('Login to GHCR') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'ghcr-creds',
                        usernameVariable: 'GHCR_USER',
                        passwordVariable: 'GHCR_TOKEN'
                    )
                ]) {

                    sh '''
                    set +x

                    echo "$GHCR_TOKEN" | docker login ghcr.io \
                        -u "$GHCR_USER" \
                        --password-stdin
                    '''
                }
            }
        }

        stage('Build & Push Web Image') {
            steps {

                sh '''
                docker pull $REGISTRY/web:$CACHE_TAG || true

                docker build \
                    --cache-from $REGISTRY/web:$CACHE_TAG \
                    -t $REGISTRY/web:$IMAGE_TAG \
                    -t $REGISTRY/web:$CACHE_TAG \
                    -f docker/Dockerfile \
                    .

                docker push $REGISTRY/web:$IMAGE_TAG
                docker push $REGISTRY/web:$CACHE_TAG
                '''
            }
        }

        stage('Copy Compose Files') {
            steps {

                sshagent(['prod-ssh']) {

                    sh '''
                    scp -o StrictHostKeyChecking=no \
                        docker-compose.yml \
                        ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {

                sshagent(['prod-ssh']) {

                    withCredentials([
                        usernamePassword(
                            credentialsId: 'ghcr-creds',
                            usernameVariable: 'GHCR_USER',
                            passwordVariable: 'GHCR_TOKEN'
                        )
                    ]) {

                        sh '''
ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} << EOF

set -e

echo "$GHCR_TOKEN" | docker login ghcr.io \
    -u "$GHCR_USER" \
    --password-stdin

cd ${DEPLOY_PATH}

export WEB_IMAGE=${REGISTRY}/web:${IMAGE_TAG}

echo "Pulling latest image..."
docker compose pull web

echo "Deploying updated container..."
docker compose up -d --force-recreate web

echo "Deployment complete."

EOF
'''
                    }
                }
            }
        }
    }

    post {

        success {
            echo "Deployment completed successfully"
        }

        failure {
            echo "Pipeline failed"
        }
    }
}
