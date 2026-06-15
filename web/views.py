from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Lead

def home(request):
    return render(request, 'index.html')

def book_demo(request):
    return render(request, 'index.html', {'open_modal': True})

def about(request):
    return render(request, 'about.html')

def agent(request):
    return render(request, 'agent.html')

def crm(request):
    return render(request, 'crm.html')

def why_us(request):
    return render(request, 'why-us.html')

def privacy(request):
    return render(request, 'privacy.html')

def terms(request):
    return render(request, 'terms.html')

@csrf_exempt
@require_POST
def submit_demo_lead(request):
    try:
        user_name = request.POST.get('user_name')
        business_type = request.POST.get('business_type')
        user_email = request.POST.get('user_email')
        preferred_date = request.POST.get('preferred_date')
        preferred_time = request.POST.get('preferred_time')

        demo_lead = Lead.objects.create(
            user_name=user_name,
            business_type=business_type,
            user_email=user_email,
            preferred_date=preferred_date if preferred_date else None,
            preferred_time=preferred_time if preferred_time else None
        )

        return JsonResponse({
            'success': True,
            'message': 'Demo request submitted successfully!.Our Team will Contact You Soon '
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'Error submitting demo request. Please try again.'
        }, status=400)
