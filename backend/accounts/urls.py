from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import GoogleLoginView, SignUpView


urlpatterns = [
    # Sign Up Endpoint
    path('api/signup/', SignUpView.as_view(), name='api_signup'),

    # Login Endpoint (Returns JWT Access and Refresh Tokens)
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh Token Endpoint (To get a new access token when it expires)
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Google OAuth Endpoint
    path('api/auth/google/', GoogleLoginView.as_view(), name='google-login'),
]