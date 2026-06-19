from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Sign Up Endpoint
    path('api/signup/', views.signup_view, name='api_signup'),

    # Login Endpoint (Returns JWT Access and Refresh Tokens)
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh Token Endpoint (To get a new access token when it expires)
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]