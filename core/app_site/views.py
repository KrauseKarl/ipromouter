from django.shortcuts import render


def index(request):
    context = {'text': 'I am working'}
    return render(request, 'index-agency.html', context=context)
