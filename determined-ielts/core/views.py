from django.shortcuts import render

def home(request):
    return render(request, "home.html")

def aitools(request):
    return render(request, "aitools.html")

def blogs(request):
    return render(request, "blogs.html")

def videos(request):
    return render(request, "videos.html")

def resources(request):
    return render(request, "resources.html")

def ielts_module(request):
    return render(request, "ielts_module.html")

def contact(request):
    return render(request, "contact.html")

def auth_page(request):
    return render(request, "auth.html")
