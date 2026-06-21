# your_app/serializers/categories.py
from rest_framework import serializers
from accounts.models import CATEGORIES

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CATEGORIES
        fields = '__all__'