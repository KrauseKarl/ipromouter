<<<<<<< HEAD
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
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER,]
                )
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
                send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER]
                )
                response = {'message': True}
            except BadHeaderError:
                return HttpResponse('Найден некорректный заголовок')
            return JsonResponse(response)

    response = {'message': False}
    return JsonResponse(response)


def my_page_not_found(request, exception):
    return render(request=request, template_name='404.html', context={'exception': exception}, status=404)

def my_server_error(request):
    return render(request=request, template_name='500.html', status=500)
=======

import json
import sys
import datetime
import locale
# locale.setlocale(locale.LC_TIME, 'ru_RU')

from django.conf import settings
from django.core.cache import cache
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django import forms
from .task import send_order_to_telegram_chat

class ContactForm(forms.Form):
    name_c = forms.CharField(max_length=50)
    telephone_c = forms.CharField(max_length=50)
    # email_c = forms.EmailField(max_length=150)
    # subject_c = forms.CharField(max_length=50)
    comments_c = forms.CharField(
        widget=forms.Textarea, max_length=2000, required=False)


class HeadHunterForm(forms.Form):
    name = forms.CharField(max_length=50)
    telephone = forms.CharField(max_length=50)
    email = forms.EmailField(max_length=150)
    position = forms.CharField(max_length=50)
    city = forms.CharField(max_length=50)
    country = forms.CharField(max_length=50)
    age = forms.CharField(max_length=50, required=False)
    sex = forms.CharField(max_length=50, required=False)
    height = forms.CharField(max_length=50, required=False)
    weight = forms.CharField(max_length=50, required=False)
    clothes_size = forms.CharField(max_length=50, required=False)
    shoes_size = forms.CharField(max_length=50, required=False)
    experience = forms.CharField(
        widget=forms.Textarea, max_length=2000, required=False)
    preferences = forms.CharField(
        widget=forms.Textarea, max_length=2000, required=False)


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
            subject = 'ЗАКАЗЧИК: ' # + form.cleaned_data['subject_c']
            body = {
                'name': form.cleaned_data['name_c'],
                # 'email': form.cleaned_data['email_c'],
                'telephone': form.cleaned_data['telephone_c'],
                # 'subject': form.cleaned_data['subject_c'],
                'comments': form.cleaned_data['comments_c'],
            }
            message = "\n".join(body.values())
            try:
                finale_message = "🔥 Заказ\n🕑 {date}\n👥 {name}\n☎ {phone}\n✍ сообщение:{msg} ".format(
                    # order_id=filename,
                    date=datetime.datetime.now().strftime(" %d-%b-%y (%H:%M)"),
                    name=body.get('name', 'anon'),
                    #email= "", # body.get('email', 'anon'),
                    phone=body.get('telephone', 'anon'),
                    #subject="", # body.get('subject', 'anon'),
                    msg=body.get('comments', 'нет комментария')
    )
                send_order_to_telegram_chat.apply_async(
                    kwargs={'data': finale_message}, 
                    expires=float(1)
                    )

                # send_mail(
                #     subject=subject,
                #     message=message,
                #     from_email=settings.EMAIL_HOST_USER,
                #     recipient_list=[settings.EMAIL_HOST_USER,]
                # )
                response = {'message': True}
                # response = {'message': False, "error": e}
            except Exception as e:
                response = {'message': False, "error": e}
                # return HttpResponse('Найден некорректный заголовок')
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
                'country': 'страна: ' + form.cleaned_data['country'],
                'city': 'город: ' + form.cleaned_data['city'],
            }
            if form.cleaned_data.get('age'):
                age = {'age':  form.cleaned_data.get('age')} #'полных лет: ' + form.cleaned_data.get('age')}
                body.update(age)
            if form.cleaned_data.get('sex'):
                sex = {'sex': form.cleaned_data.get('sex')} #'пол: ' + form.cleaned_data.get('sex')}
                body.update(sex)
            if form.cleaned_data.get('height'):
                height = {'height': form.cleaned_data.get('height')} # 'рост: ' + form.cleaned_data.get('height')}
                body.update(height)
            if form.cleaned_data.get('weight '):
                weight = {'weight': form.cleaned_data.get('weight')} #'вес:' + form.cleaned_data.get('weight')}
                body.update(weight)
            if form.cleaned_data.get('clothes_size'):
                clothes_size = {'clothes_size': form.cleaned_data.get('clothes_size')} #'размер одежды: ' + form.cleaned_data.get('clothes_size')}
                body.update(clothes_size)
            if form.cleaned_data.get('shoes_size'):
                shoes_size = {'shoes_size': form.cleaned_data.get('shoes_size')} # 'размер обуви: ' + form.cleaned_data.get('shoes_size')}
                body.update(shoes_size)
            if form.cleaned_data.get('experience'):
                experience = {'experience': form.cleaned_data.get('experience')} #'опыт работы: ' + form.cleaned_data.get('experience')}
                body.update(experience)
            if form.cleaned_data.get('preferences'):
                preferences = {'preferences': form.cleaned_data.get('preferences')} #'пожелания: ' + form.cleaned_data.get('preferences')}
                body.update(preferences)
            message = "\n".join(body.values())


            try:
                finale_message = "✅ Вакансия\n🕑 {date}\n👥 {name}\n✉ {email}\n☎ {phone}\n★ {position}\n\n⛳ {city}\n⛳{country}\n\n⚪ возраст: {age}\n⚪ пол: {sex}\n⚪ рост: {height}\n⚪ все: {weight}\n⚪ размер одежды: {clothes_size}\n⚪ размер обуви: {shoes_size}\n\n⏳ опыт:{experience}\n💰 пожелания:{preferences}\n\n\n#{vac}\n#{place}".format(# order_id=filename,
                date=datetime.datetime.now().strftime("%d-%b-%y (%H:%M)"),
                name=body.get('name', 'не указан'),
                email=body.get('email','не указан'),
                phone=body.get('telephone', 'не указан'),
                position=body.get('position', 'не указан'),

                country = body.get('country', 'anon'),
                city = body.get('city', 'anon'),
                age = body.get('age', 'не указан'),
                sex = body.get('sex', 'не указан'),
                height = body.get('height', 'не указан'),
                weight = body.get('weight', 'не указан'),
                clothes_size = body.get('clothes_size', 'не указан'),
                shoes_size = body.get('shoes_size', 'не указан'),
                experience = body.get('experience', 'не указан'),
                preferences = body.get('preferences', 'не указан'),
                vac = body.get('position', 'anon').split(":")[1].replace('-', '_').strip(),
                place = body.get('city', 'anon').split(":")[1].strip()

    )
                send_order_to_telegram_chat.apply_async(
                    kwargs={'data': finale_message}, 
                    expires=float(1)
                    )
                # send_mail(
                #     subject=subject,
                #     message=message,
                #     from_email=settings.EMAIL_HOST_USER,
                #     recipient_list=[settings.EMAIL_HOST_USER]
                # )
                response = {'message': True}
            except BadHeaderError:
                return HttpResponse('Найден некорректный заголовок')
            return JsonResponse(response)

    response = {'message': False}
    return JsonResponse(response)


def my_page_not_found(request, exception):
    return render(
        request=request, 
        template_name='404.html', 
        context={'exception': exception}, 
        status=404
        )

def my_server_error(request):
    return render(
        request=request, 
        template_name='500.html', 
        status=500
        )
>>>>>>> 6110949cb381fe83926376cf17ed9f97b0b73a67
