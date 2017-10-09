from rest_framework import serializers, status
from .models import Orders


# Serializers define the API representation.
class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'
