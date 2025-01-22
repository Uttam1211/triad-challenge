import uuid
from time import time
import jwt  # https://github.com/jpadilla/pyjwt

# Read private key from PEM file
try:
    with open("test-1.pem", "r") as f:
        private_key = f.read()
except FileNotFoundError:
    raise FileNotFoundError("Private key file 'test-1.pem' not found.")
except Exception as e:
    raise RuntimeError(f"Error reading the private key: {e}")



# Claims for the JWT
claims = {
    "sub": "hP5xwtN4Ew5Q2UK0GDDXFFerRcujAOhL",  # Subject
    "iss": "hP5xwtN4Ew5Q2UK0GDDXFFerRcujAOhL",  # Issuer
    "jti": str(uuid.uuid4()),                  # Unique ID
    "aud": "https://int.service.nhs.uk/oauth2/token",  # Audience
    "exp": int(time()) + 300,                 # Expiry (5 minutes)
}

# Headers for the JWT
additional_headers = {"kid": "test-1"}

# Generate the JWT
try:
    jwt_token = jwt.encode(claims, private_key, algorithm="RS512", headers=additional_headers)
    print("Generated JWT:", jwt_token)
except Exception as e:
    raise RuntimeError(f"Error generating the JWT: {e}")
