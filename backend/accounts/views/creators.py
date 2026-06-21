from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import FREQUENTLY_INTERACTED
from accounts.serializers import FrequentlyInteractedSerializer, FREQUENTLY_INTERACTED, CREATORS, CreatorsSerializer




@api_view(['GET'])
def get_frequently_interacted(request):
    frequently_interacted = FREQUENTLY_INTERACTED.objects.all()  # Fetch data from SQL
    serializer = FrequentlyInteractedSerializer(frequently_interacted, many=True) # Convert to JSON
    return Response(serializer.data)

@api_view(['GET'])
def get_creators_for_you(request):
    creators_for_you = CREATORS.objects.all()  # Fetch data from SQL
    serializer = CreatorsSerializer(creators_for_you, many=True) # Convert to JSON
    return Response(serializer.data)
