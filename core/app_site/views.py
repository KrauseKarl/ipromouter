import json

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect


from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(max_length=50)
    telephone = forms.CharField(max_length=50)
    email = forms.EmailField(max_length=150)
    subject = forms.CharField(max_length=50)
    comments = forms.CharField(widget=forms.Textarea, max_length=2000)


def index(request):

    cities = cache.get('all_cities')
    if not cities:
        with open('Города.json', 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        cities = cache.set('all_cities', data, 3600)

    with open('big_cities.json', 'r', encoding='utf-8') as json_file:
        big_cities = json.load(json_file)
    with open('kazakhtan_cities.json', 'r', encoding='utf-8') as json_file:
        kz_cities = json.load(json_file)
    context = {
        'cities': cities,
        'big_cities': big_cities,
        'kz_cities': kz_cities,
        'form': ContactForm()
    }
    return render(request, 'index.html', context=context)


def contact(request):
    if request.method == 'POST' and request.is_ajax():
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            body = {
                'name': form.cleaned_data['name'],
                'email': form.cleaned_data['email'],
                'telephone': form.cleaned_data['telephone'],
                'subject': form.cleaned_data['subject'],
                'comments': form.cleaned_data['comments'],
            }
            message = "\n".join(body.values())
            try:
                print('\n test:', message, '\n')
                send_mail(subject, message,
                          settings.EMAIL_HOST_USER,
                          [settings.EMAIL_HOST_USER])
                response = {'message': True}
            except BadHeaderError:
                return HttpResponse('Найден некорректный заголовок')
            return JsonResponse(response)

    response = {'message': False}
    return JsonResponse(response)
