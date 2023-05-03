import json

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(max_length=50)
    telephone = forms.CharField(max_length=50)
    email = forms.EmailField(max_length=150)
    subject = forms.CharField(max_length=50)
    comments = forms.CharField(widget=forms.Textarea, max_length=2000)


def index(request):
    time_cache = 604800

    cities = cache.get('all_cities')
    if not cities:
        with open('info/cities.json', 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        cities = cache.set('all_cities', data, time_cache)

    region_city = cache.get('region_city')
    if not region_city:
        with open('info/cities_by_region.json', 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        region_city = cache.set('region_city', data, time_cache)

    big_cities = cache.get('big_cities')
    if not big_cities:
        with open('info/big_cities.json', 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        big_cities = cache.set('big_cities', data, time_cache)

    kz_cities = cache.get('kz_cities')
    if not kz_cities:
        with open('info/kz_cities.json', 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        kz_cities = cache.set('kz_cities', data, time_cache)

    context = {
        'cities': cities,
        'big_cities': big_cities,
        'kz_cities': kz_cities,
        'form': ContactForm(),
        'region_city': region_city,
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
