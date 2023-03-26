import json

from django.shortcuts import render


def index(request):
    with open('ru.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
        country_book = {}
        for i in data:
            if country_book.get(i['region']):
                country_book[i['region']].append(i['city'])
            else:
                country_book[i['region']] = [i['city'], ]
    context = {'cities':country_book}
    return render(request, 'index-agency.html', context=context)


def feature(request):
    return render(request, 'feature.html', )


def cities(request):
    with open('ru.json', 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
        country_book = {}
        for i in data:

            if country_book.get(i['region']):
                country_book[i['region']].append(i['city'])

            else:
                country_book[i['region']] = [i['city'], ]

    print(sorted(country_book.items(), key=lambda item: item[1]))
    return render(request, 'cities.html', context={'cities': country_book})
