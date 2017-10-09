from django.conf.urls import url, include

from . import model_viewsets, views

urlpatterns = [
    url(r'^api/', include(model_viewsets.urlpatterns)),
    url(r'^$', views.index_view, name='index'),
    url(r'^order/', views.order_view, name='order_view'),

]
