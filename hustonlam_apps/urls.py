from django.conf.urls import url, include

from . import model_viewsets, views, fake_data

urlpatterns = [
    url(r'^api/', include(model_viewsets.urlpatterns)),
    url(r'^$', views.index_view, name='index'),
    url(r'^order/', views.order_view, name='order_view'),
    url(r'^order-kanban/', views.order_kanban_view, name='order_kanban_view'),
    url(r'^create-fake-data/', fake_data.fake_data, name='fake_data'),

]
