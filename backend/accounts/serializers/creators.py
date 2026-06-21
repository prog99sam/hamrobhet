# your_app/serializers/categories.py
from rest_framework import serializers
from accounts.models import FREQUENTLY_INTERACTED, CATEGORIES, CREATORS

class FrequentlyInteractedSerializer(serializers.ModelSerializer):
    class Meta:
        model = FREQUENTLY_INTERACTED
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CATEGORIES
        fields = '__all__'

class CreatorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CREATORS
        fields = '__all__'