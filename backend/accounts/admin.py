from django.contrib import admin


from .models import CATEGORIES, FREQUENTLY_INTERACTED, CREATORS , UserProfile  # 1. Import your model

class CategoriesAdmin(admin.ModelAdmin):
    # Add the exact field names from your models.py that you want to see as columns
    list_display = ('id', 'name', 'img')
# Register your models here.
class FrequentlyInteractedAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'img')

    
class CreatorsAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'img')
admin.site.register(CATEGORIES, CategoriesAdmin)  # 2. Register your model with the admin site
admin.site.register(FREQUENTLY_INTERACTED, FrequentlyInteractedAdmin)  # Register FREQUENTLY_INTERACTED model
admin.site.register(CREATORS, CreatorsAdmin)  # Register CREATORS model
admin.site.register(UserProfile)