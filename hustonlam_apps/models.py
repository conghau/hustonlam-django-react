from django.db import models
from django.utils.timezone import now
from .constants import ORDER_STATUS_CHOICES


# This class holds information about drug.
class Orders(models.Model):
    o_from = models.CharField(max_length=30)
    o_to = models.CharField(max_length=30)
    quantity = models.IntegerField()
    status = models.CharField(choices=ORDER_STATUS_CHOICES, default='new', max_length=10)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now_add=True, blank=True)

    # We override the __str__ method for more descriptive name in the admin area.
    def __str__(self):
        return '{} {} {}'.format(self.status, self.o_from, self.o_to)
