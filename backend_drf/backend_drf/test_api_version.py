import requests

response = requests.post('http://localhost:8000/api-token-auth/',
                         data={
                             'username': 'admin',
                             'password': 'admin'
                         })
token = f'Token {response.json()["token"]}'
print(response.json())
response = requests.get('http://localhost:8000/api/userinfo/1/', headers={'Accept': 'application/json', 'Authorization': token})
print(response.json())
response = requests.get('http://localhost:8000/api/userinfo/1/', headers={'Accept': 'application/json; version=0.2', 'Authorization': token})
print(response.json())