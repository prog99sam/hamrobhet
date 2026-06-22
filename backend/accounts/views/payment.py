import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class InitializePaymentView(APIView):
    def post(self, request):
        # Expecting regular Rupees from React (e.g., 1000)
        rupee_amount = request.data.get('amount') 
        order_id = request.data.get('order_id')
        
        # Get customer metadata from request
        customer_name = request.data.get('name', 'Ram Sharma')
        customer_email = request.data.get('email', 'ram@example.com')
        customer_phone = request.data.get('phone', '9841234567')

        if not rupee_amount or not order_id:
            return Response(
                {"error": "Amount and order_id are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # 1. Convert Rupees to Paisa as required by the docs (e.g., 1000 Rs -> 100000 Paisa)
            paisa_amount = int(float(rupee_amount) * 100)

            # 2. PayBridgeNP real live REST API endpoint
            url = "https://api.paybridgenp.com/v1/checkout" 
            
            # 3. Setup authentication header using your .env key
            headers = {
                "Authorization": f"Bearer sk_test_erWg8cOZmFJ2fdID60hvSHwwDdzHtqs7",
                "Content-Type": "application/json"
            }
            
            # 4. Map payload properties exactly to match your SDK documentation schema
           # Update your payload dictionary inside payment.py:
            payload = {
            "amount": paisa_amount,
     "currency": "NPR",
    "customer": {
        "name": customer_name,
        "email": customer_email,
        "phone": customer_phone,
         },
    # ADD THIS LINE (point it to your React success page)
        "returnUrl": "http://localhost:3000/payment-success", 
        "metadata": {
        "order_id": str(order_id)
        },
    }

            # 5. Execute HTTP request
            response = requests.post(url, json=payload, headers=headers)
            response_data = response.json()

            if response.status_code in [200, 201]:
                # Send the valid hosted checkout token url to your React application
                return Response({"checkout_url": response_data.get("checkout_url")}, status=status.HTTP_200_OK)
            
            return Response(
                {"error": "PayBridgeNP rejected request", "details": response_data}, 
                status=response.status_code
            )

        except Exception as e:
            return Response(
                {"error": f"Payment initialization failed: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        





