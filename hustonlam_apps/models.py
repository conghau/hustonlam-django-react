from django.db import models
from django.utils.timezone import now
from django.utils import timezone
from .constants import ORDER_STATUS_CHOICES


# This class holds information about drug.
class Orders(models.Model):
    o_from = models.CharField(max_length=30)
    o_to = models.CharField(max_length=30)
    quantity = models.IntegerField()
    status = models.CharField(choices=ORDER_STATUS_CHOICES, default='new', max_length=10)
    created_at = models.DateTimeField(blank=True)
    updated_at = models.DateTimeField(blank=True)
    finish_time = models.IntegerField(blank=True, default=None)
    order_key = models.CharField(max_length=15, unique=True, null=True)

    def save(self, migrate=False, *args, **kwargs):
        if not migrate:
            if not self.id:
                self.created_at = timezone.now()
            self.updated_at = timezone.now()
        return super(Orders, self).save(*args, **kwargs)

    # We override the __str__ method for more descriptive name in the admin area.
    def __str__(self):
        return '{} {} {}'.format(self.status, self.o_from, self.o_to)
