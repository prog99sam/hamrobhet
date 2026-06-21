from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import CATEGORIES
from accounts.serializers import CategoriesSerializer









@api_view(['GET'])
def get_categories(request):
    categories = CATEGORIES.objects.all()  # Fetch data from SQL
    serializer = CategoriesSerializer(categories, many=True) # Convert to JSON
    return Response(serializer.data)