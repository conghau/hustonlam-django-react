from django.core.management import BaseCommand
from django.conf.urls import RegexURLPattern, RegexURLResolver
from django.core import urlresolvers
import glob
import csv
from hustonlam_apps.models import Orders
from hustonlam_apps.constants import ORDER_STATUS_CHOICES, ORDER_STATUS_LIST, ORDER_STATUS_0
from django.utils.text import Truncator
from datetime import datetime
import random
from dateutil import tz
from django.utils import timezone
from hustonlamBE.conf import path_to_folder_import, path_to_folder_archive
import os


class Command(BaseCommand):
    def add_arguments(self, parser):

        pass

    def handle(self, *args, **kwargs):

        def get_list_file():
            return glob.glob(path_to_folder_import + '*.csv')

        def process_import_file(file_name):
            with open(file_name, 'rt') as f_obj:
                read_and_import(f_obj)

        def read_and_import(file_obj):
            """
            Read a CSV file using csv.DictReader
            """
            reader = csv.DictReader(file_obj, delimiter=',')
            from_zone = tz.gettz('UTC')
            for line in reader:
                order_key = line["ID"]
                order_status = line["STATUS"]
                order_time = datetime.strptime(line["CREATED"], '%Y-%m-%d %H:%M:%S')
                order_time = timezone.make_aware(order_time, timezone.get_current_timezone())

                order_time.replace(tzinfo=from_zone)

                current_order = Orders.objects.filter(order_key=order_key).last()

                # if current order is none then create, otherwise update
                if current_order is None:
                    data = Orders()
                    data.created_at = order_time
                    data.updated_at = order_time
                else:
                    if order_time < current_order.created_at:
                        continue
                    data = current_order
                    data.updated_at = order_time

                data.order_key = order_key
                data.o_from = line["FROM"]
                data.o_to = line["TO"]
                data.quantity = random.randint(1, 100)
                data.finish_time = line["FINISHED"]
                data.status = Truncator(ORDER_STATUS_LIST.get(int(order_status), ORDER_STATUS_0)).chars(10)

                data.save(migrate=True)

        def process_import_folder():
            list_files = get_list_file()
            time_run_batch = datetime.now().strftime('%Y%m%d_%H%M%S')
            os.makedirs(path_to_folder_archive, exist_ok=True)

            for file in list_files:
                print('| {} |'.format(file))
                file_name = '{}'.format(file)
                head, tail = os.path.split(file_name)
                process_import_file(file_name)

                file_name_new = path_to_folder_archive + tail + '.' + time_run_batch
                os.rename(file_name, file_name_new)

            print('-' * 100)

        process_import_folder()

    print('-' * 100)
