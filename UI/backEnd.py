from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS
import platform
import psutil
from systenInfo import get_battery_percentage, get_system_sound_percentage, get_cpu_usage, get_memory_usage, get_disk_usage
from Dyanamic import dyanamicModel

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# trigger by word "zyra"

@app.route('/process-input', methods=['POST'])
def process_input():
    data = request.get_json()
    user_input = data.get('userInput', '')

    # Process the input (e.g., generate a response)
    response = dyanamicModel(user_input)
    
    return jsonify({'response': response})

@app.route('/system-info', methods=['GET'])
def system_info():
    info = {
        "BatteryPercentage": get_battery_percentage(),
        "SystemSound": get_system_sound_percentage(),
        "cpuUsage": get_cpu_usage(),
        "memoryUsage": get_memory_usage(),
        "diskUsage": get_disk_usage()
    }
    return jsonify(info)

if __name__ == '__main__':
    app.run(debug=True)
