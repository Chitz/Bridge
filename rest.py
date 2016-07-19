import requests
url = 'http://ec2-54-175-94-42.compute-1.amazonaws.com:9000/listUsers?utterance=abc'
data = 'utterance: "How are you"'
response = requests.get(url, data=data)
print response
