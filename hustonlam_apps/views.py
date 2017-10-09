from django.shortcuts import render
from hustonlamBE import conf


# Create your views here.
def index_view(request):
    return render(request, 'hustonlam_apps/index.html', {
    })


def order_view(request):
    context = {'mode': conf.MODE_DEVELOPMENT, 'asset_version': conf.asset_version}

    return render(request, 'hustonlam_apps/order.html', context)
