from django.shortcuts import render
from hustonlamBE import conf


# Create your views here.
def index_view(request):
    context = {'mode': conf.MODE_DEVELOPMENT, 'asset_version': conf.asset_version, 'base_url': conf.base_url}
    return render(request, 'hustonlam_apps/index.html', context)


def order_view(request):
    context = {'mode': conf.MODE_DEVELOPMENT, 'asset_version': conf.asset_version, 'base_url': conf.base_url}

    return render(request, 'hustonlam_apps/order.html', context)


def order_kanban_view(request):
    context = {'mode': conf.MODE_DEVELOPMENT, 'asset_version': conf.asset_version, 'base_url': conf.base_url}

    return render(request, 'hustonlam_apps/order_kanban.html', context)
