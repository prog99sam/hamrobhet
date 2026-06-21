# accounts/views/profile.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import CREATORS

class CreatorDetailView(APIView):
    def get(self, request, username):
        try:
            # Look up the creator using the unique slug/username field
            creator = CREATORS.objects.get(username__iexact=username)
            
            return Response({
                "username": creator.username,
                "display_name": creator.display_name,
                "bio": creator.bio,
                "category": creator.category,
                "sub_fans": creator.sub_fans,
                "sub_supporters": creator.sub_supporters,
                "sub_super_fans": creator.sub_super_fans,
                
                "img": creator.img  # Send the cloud link back
            }, status=status.HTTP_200_OK)
            
        except CREATORS.DoesNotExist:
            return Response({"error": "Creator profile not found"}, status=status.HTTP_404_NOT_FOUND)