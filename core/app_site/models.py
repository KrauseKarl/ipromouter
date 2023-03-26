from django.db import models


# class Service(models.Model):
#     title = models.CharField(max_length=200, verbose_name='название')
#     slug = models.SlugField()
#     description = models.TextField(verbose_name='описание')
#     location = models.ManyToManyField('Location', related_name='services')
#     advantages = models.ManyToManyField('Advantage', related_name='services')
#     conditions = models.ManyToManyField('Condition', related_name='services')
#     price = models.ManyToManyField('Price', related_name='services')
#     objects = models.Manager()
#
#     def __str__(self):
#         return self.title
#
#
# class Location(models.Model):
#     title = models.CharField(max_length=200, verbose_name='место проведения')
#     objects = models.Manager()
#
#     def __str__(self):
#         return self.title
#
#
# class Advantage(models.Model):
#     title = models.CharField(max_length=200, verbose_name='преимущества')
#     description = models.TextField(verbose_name='описание')
#     objects = models.Manager()
#
#     def __str__(self):
#         return self.title
#
#
# class Condition(models.Model):
#     title = models.CharField(max_length=200, verbose_name='условия')
#     objects = models.Manager()
#
#     def __str__(self):
#         return self.title
#
#
# class Price(models.Model):
#     title = models.CharField(max_length=200, verbose_name='название тарифа')
#     price = models.DecimalField(max_length=9, )
#     service = models.ManyToManyField('Feature')
#     objects = models.Manager()
#
#     def __str__(self):
#         return self.title
#
