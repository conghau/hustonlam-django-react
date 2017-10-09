import json

from django.conf.urls import url, include
from django.contrib.auth.hashers import check_password
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import routers, viewsets, filters
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .model_serializers import OrdersSerializer
from .models import Orders


# ViewSets define the view behavior.
class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'orders', OrdersViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'v1/', include(router.urls)),
]
