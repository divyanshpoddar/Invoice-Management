from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('invoices.urls')),  # Include the URLs from the 'invoices' app
]