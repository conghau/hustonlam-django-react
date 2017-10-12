from django.utils.translation import ugettext as _

ORDER_STATUS_CHOICES = (
    ('new', _("New")),
    ('processing', _("Processing")),
    ('finished', _("Finished")),
)

ORDER_STATUS_0 = 'new'
ORDER_STATUS_1 = 'processing'
ORDER_STATUS_2 = 'finished'

ORDER_STATUS_LIST = {0: 'new', 1: 'processing', 2: 'finished'}
