# utils/paystack.py
import requests
from django.conf import settings

class Paystack:
    secret_key = settings.PAYSTACK_SECRET_KEY
    base_url = "https://api.paystack.co"

    @classmethod
    def initialize_payment(cls, email, amount, reference):
        url = f"{cls.base_url}/transaction/initialize"
        headers = {
            "Authorization": f"Bearer {cls.secret_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "email": email,
            "amount": int(amount) * 100,  # Paystack works in kobo
            "reference": reference,
        }
        response = requests.post(url, json=payload, headers=headers)
        return response.json()

    @classmethod
    def verify_payment(cls, reference):
        url = f"{cls.base_url}/transaction/verify/{reference}"
        headers = {
            "Authorization": f"Bearer {cls.secret_key}",
        }
        response = requests.get(url, headers=headers)
        return response.json()
