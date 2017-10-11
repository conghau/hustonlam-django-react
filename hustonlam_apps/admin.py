from django.contrib import admin
from .models import Orders


# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    fields = ['o_from', 'o_to', 'status', 'quantity', 'finish_time', ]
    list_display = (
        'id', 'o_from', 'o_to', 'status', 'created_at', 'quantity',
        'updated_at', 'finish_time')
    # list_editable = ('message_content',)
    list_display_links = ('id',)

admin.site.register(Orders, OrderAdmin)
