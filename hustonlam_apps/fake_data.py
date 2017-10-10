from .models import Orders
import random
import json
from django.http import JsonResponse


def fake_data(self):
    # Parses dummy patient data from the given excel workbook.
    stores = ['SA', 'SB']
    # RA = ['R1', 'R2', 'R3', 'R4', 'R5', ]
    # RB = ['R6', 'R7', 'R8', 'R9', 'R10', ]
    store = random.choice(stores)
    data = Orders()
    data.o_from = store
    data.quantity = random.randint(1, 100)
    data.finish_time = random.randint(10, 30)
    data.status = 'new'

    if store == 'SA':
        data.o_to = 'R' + str(random.randint(1, 5))
    if store == 'SB':
        data.o_to = 'R' + str(random.randint(6, 10))

    data.save()

    return JsonResponse({'message': 'OK'})
