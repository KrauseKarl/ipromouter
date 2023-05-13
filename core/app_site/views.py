import json

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django import forms


class ContactForm(forms.Form):
    name_c = forms.CharField(max_length=50)
    telephone_c = forms.CharField(max_length=50)
    email_c = forms.EmailField(max_length=150)
    subject_c = forms.CharField(max_length=50)
    comments_c = forms.CharField(widget=forms.Textarea, max_length=2000)


class HeadHunterForm(forms.Form):
    name = forms.CharField(max_length=50)
    telephone = forms.CharField(max_length=50)
    email = forms.EmailField(max_length=150)
    position = forms.CharField(max_length=50)
    city = forms.CharField(max_length=50)
    age = forms.CharField(max_length=50, required=False)
    sex = forms.CharField(max_length=50, required=False)
    height = forms.CharField(max_length=50, required=False)
    weight = forms.CharField(max_length=50, required=False)
    clothes_size = forms.CharField(max_length=50, required=False)
    shoes_size = forms.CharField(max_length=50, required=False)
    experience = forms.CharField(widget=forms.Textarea, max_length=2000, required=False)
    preferences = forms.CharField(widget=forms.Textarea, max_length=2000, required=False)


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
            subject = 'ЗАКАЗЧИК: ' + form.cleaned_data['subject_c']
            body = {
                'name': form.cleaned_data['name_c'],
                'email': form.cleaned_data['email_c'],
                'telephone': form.cleaned_data['telephone_c'],
                'subject': form.cleaned_data['subject_c'],
                'comments': form.cleaned_data['comments_c'],
            }
            message = "\n".join(body.values())
            try:
                send_mail(subject, message,
                          settings.EMAIL_HOST_USER,
                          [settings.EMAIL_HOST_USER])
                response = {'message': True}
            except BadHeaderError:
                return HttpResponse('Найден некорректный заголовок')
            return JsonResponse(response)

    response = {'message': False}
    return JsonResponse(response)


def candidate(request):
    if request.method == 'POST' and request.is_ajax():
        form = HeadHunterForm(request.POST)
        if form.is_valid():
            subject = 'СОИСКАТЕЛЬ: ' + form.cleaned_data['position'] + ' (' + form.cleaned_data['city'] + ")"
            body = {
                'name': 'имя: ' + form.cleaned_data['name'],
                'email': 'почта: ' + form.cleaned_data['email'],
                'position': 'вакансия: ' + form.cleaned_data['position'],
                'telephone': 'телефон: ' + form.cleaned_data['telephone'],
                'city': 'город: ' + form.cleaned_data['city'],
            }
            if form.cleaned_data.get('age'):
                age = {'age': 'полных лет: ' + form.cleaned_data.get('age')}
                body.update(age)
            if form.cleaned_data.get('sex'):
                sex = {'sex': 'пол: ' + form.cleaned_data.get('sex')}
                body.update(sex)
            if form.cleaned_data.get('height'):
                height = {'height': 'рост: ' + form.cleaned_data.get('height')}
                body.update(height)
            if form.cleaned_data.get('weight '):
                weight = {'weight': 'вес:' + form.cleaned_data.get('weight')}
                body.update(weight)
            if form.cleaned_data.get('clothes_size'):
                clothes_size = {'clothes_size': 'размер одежды: ' + form.cleaned_data.get('clothes_size')}
                body.update(clothes_size)
            if form.cleaned_data.get('shoes_size'):
                shoes_size = {'shoes_size': 'размер обуви: ' + form.cleaned_data.get('shoes_size')}
                body.update(shoes_size)
            if form.cleaned_data.get('experience'):
                experience = {'experience': 'опыт работы: ' + form.cleaned_data.get('experience')}
                body.update(experience)
            if form.cleaned_data.get('preferences'):
                preferences = {'preferences': 'пожелания: ' + form.cleaned_data.get('preferences')}
                body.update(preferences)

            message = "\n".join(body.values())
            try:
                print('\n', message, '\n')
                send_mail(subject, message,
                          settings.EMAIL_HOST_USER,
                          [settings.EMAIL_HOST_USER])
                response = {'message': True}
            except BadHeaderError:
                return HttpResponse('Найден некорректный заголовок')
            return JsonResponse(response)

    response = {'message': False}
    return JsonResponse(response)


def my_page_not_found(request, exception):
    return render(request=request, template_name='404.html', context={'exception': exception}, status=404)
