from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from google.oauth2 import id_token
from rest_framework.decorators import api_view

from google.auth.transport import requests
import os
# your_app/views.py
from accounts.serializers import  SignUpSerializer




# Must match the Google Client ID from your frontend (index.js)
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', '963900427336-efi4a04rt7ivvoo1s48l22t8nfb4ahif.apps.googleusercontent.com')

class GoogleLoginView(APIView):
    def post(self, request):
        token = request.data.get('token')
        
        if not token:
            return Response(
                {"error": "Token is required", "status": "MISSING_TOKEN"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            print(f"[DEBUG] Verifying token with Client ID: {GOOGLE_CLIENT_ID}")
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            print(f"[DEBUG] Token verified successfully for email: {idinfo.get('email')}")
            
            # Extract user info from verified data
            email = idinfo.get('email')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            
            if not email:
                return Response(
                    {"error": "Email not provided in Google token", "status": "NO_EMAIL"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Generate unique username from email
            base_username = email.split('@')[0]
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            
            # Fetch or create user in your database
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': username,
                    'first_name': first_name,
                    'last_name': last_name
                }
            )
            
            print(f"[DEBUG] User {'created' if created else 'retrieved'}: {user.email}")
            
            # Generate JWT tokens for frontend
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Successfully authenticated",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            print(f"[DEBUG] ValueError in token verification: {str(e)}")
            return Response({
                "error": f"Invalid Google token: {str(e)}", 
                "status": "INVALID_TOKEN",
                "details": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"[DEBUG] Unexpected error: {type(e).__name__}: {str(e)}")
            return Response({
                "error": f"Authentication error: {str(e)}", 
                "status": "AUTH_ERROR",
                "details": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SignUpView(APIView):

    def post(self, request):
        from .serializers import SignUpSerializer
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




