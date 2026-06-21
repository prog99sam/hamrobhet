from django.contrib import admin


from .models import CATEGORIES  # 1. Import your model

class CategoriesAdmin(admin.ModelAdmin):
    # Add the exact field names from your models.py that you want to see as columns
    list_display = ('id', 'name', 'img')
# Register your models here.
admin.site.register(CATEGORIES, CategoriesAdmin)  # 2. Register your model with the admin site
