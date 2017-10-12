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
from hustonlamBE.conf import path_to_folder_import
import os


class Command(BaseCommand):
    def add_arguments(self, parser):

        pass

    def handle(self, *args, **kwargs):

        def turn_off_auto_now(ModelClass, field_name):
            def auto_now_off(field):
                field.auto_now = False

            do_to_model(ModelClass, field_name, auto_now_off)

        def turn_off_auto_now_add(ModelClass, field_name):
            def auto_now_add_off(field):
                field.auto_now_add = False

            do_to_model(ModelClass, field_name, auto_now_add_off)

        def do_to_model(ModelClass, field_name, func):
            field = ModelClass._meta.get_field(field_name)
            func(field)

        def csv_dict_reader(file_obj):
            """
            Read a CSV file using csv.DictReader
            """
            reader = csv.DictReader(file_obj, delimiter=',')
            from_zone = tz.gettz('UTC')
            for line in reader:
                # print(line["ID"]),
                # print(line["FROM"])
                # print(line["TO"])
                # print(line["STATUS"])
                # print(line["CREATED"])
                # print(line["FINISHED"])
                # print(line["TRUCKID"])

                order_key = line["ID"]
                order_status = line["STATUS"]
                order_time = datetime.strptime(line["CREATED"], '%Y-%m-%d %H:%M:%S')
                order_time = timezone.make_aware(order_time, timezone.get_current_timezone())

                order_time.replace(tzinfo=from_zone)

                current_order = Orders.objects.filter(order_key=order_key).last()

                # turn_off_auto_now(Orders, "created_at")
                # turn_off_auto_now_add(Orders, "updated_at")
                if current_order is None:
                    data = Orders()
                    data.created_at = order_time
                    data.updated_at = order_time
                else:
                    data = current_order
                    data.updated_at = order_time

                data.order_key = order_key
                data.o_from = line["FROM"]
                data.o_to = line["TO"]
                data.quantity = random.randint(1, 100)
                data.finish_time = line["FINISHED"]
                data.status = Truncator(ORDER_STATUS_LIST.get(int(order_status), ORDER_STATUS_0)).chars(10)

                data.save(migrate=True)

        def get_list_file():
            list_files = glob.glob(path_to_folder_import + '*.csv')
            print('-' * 100)
            for file in list_files:
                print('| {} |'.format(file))
                file_name = '{}'.format(file)
                with open(file_name, 'rt') as f_obj:
                    csv_dict_reader(f_obj)
                    os.unlink(file_name)

            print('-' * 100)

        get_list_file()
        print('-' * 100)
