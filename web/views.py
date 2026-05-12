from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

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
