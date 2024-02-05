import os
import json
import dotenv
import requests
from flask import Flask, jsonify, render_template, request

env = dotenv.load_dotenv()

app = Flask(__name__)
api = os.getenv('API')
Secret_key = 'SECRET'
app.secret_key = Secret_key

mapping = {
    '1000': '113',
    '1003': '116',
    '1006': '119',
    '1009': '119',
    '1030': '119',
    '1135': '119',
    '1147': '119',
    '1063': '176',
    '1180': '176',
    '1198': '176',
    '1201': '176',
    '1204': '176',
    '1207': '176',
    '1183': '176',
    '1066': '179',
    '1069': '179',
    '1072': '179',
    '1114': '179',
    '1117': '179',
    '1087': '200',
    '1273': '200',
    '1276': '200',
    '1279': '200',
    '1282': '200',
    '1150': '263',
    '1153': '263',
    '1168': '281',
    '1171': '281',
    '1186': '299',
    '1189': '305',
    '1192': '305',
    '1195': '305',
    '1210': '323',
    '1213': '323',
    '1216': '323',
    '1219': '323',
    '1222': '323',
    '1225': '323',
    '1237': '323',
    '1240': '323',
    '1255': '323',
    '1258': '323',
    '1261': '323',
    '1264': '323',
    '1243': '356',
    '1246': '356',
    '1249': '356',
    '1252': '356',
}



def fetch_weather(api_key,longitude,latitude):
    base_url = f'https://api.weatherapi.com/v1/forecast.json?key={api_key}&q={longitude},{latitude}&days=1'

    response = requests.get(base_url)
    data = {}
    if response.status_code == 200:
        res = response.json()


        data['location'] = res['location']['name']
        data['region'] = res['location']['region']
        data['weather'] = res['current']['temp_c']
        data['text'] = res['current']['condition']['text']
        data['wind_speed'] = res['current']['wind_kph']
        data['percipitation'] = res['current']['precip_mm']
        data['sunrise'] = res['forecast']['forecastday'][0]['astro']['sunrise']
        data['sunset'] = res['forecast']['forecastday'][0]['astro']['sunset']
        code = res['current']['condition']['code']
        data['img_path'] = f'\\static\\img\\{mapping[str(code)]}.svg'
        hours = res['forecast']['forecastday'][0]['hour']

        time = 0
        for hour in hours:
            if 'hour' not in data:
                data['hour'] = {}
                code = res['current']['condition']['code']
                data['hour'][str(time)] = [hour['temp_c'],f'\\static\\img\\{mapping[str(code)]}.svg']
            else:
                data['hour'][str(time)] = [hour['temp_c'],f'\\static\\img\\{mapping[str(code)]}.svg']
            time += 1

    return data


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/weather',methods=['POST'])
def city_weather():
    data = request.data
    data_str = data.decode('utf-8')
    if len(data_str) > 0:
        data = json.loads(data_str)
        response = fetch_weather(api,data['latitude'], data['longitude'])
        return jsonify(response)
    else:
        return jsonify({'error': True})

if __name__ == '__main__':
    app.run()