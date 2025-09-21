import psutil
import platform
from ctypes import POINTER, cast
from comtypes import CLSCTX_ALL
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
import comtypes


# Function to calculate battery percentage
def get_battery_percentage():
    battery = psutil.sensors_battery()
    if battery:
        return battery.percent
    else:
        return "Battery information not available"

# Function to calculate system sound percentage
def get_system_sound_percentage():
    comtypes.CoInitialize()  # Initialize COM library
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(
        IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    # Get the current master volume (range 0.0 to 1.0)
    volume_level = volume.GetMasterVolumeLevelScalar()
    comtypes.CoUninitialize()  # Uninitialize COM library after use
    return int(volume_level * 100)
# Function to calculate CPU usage percentage
def get_cpu_usage():
    return psutil.cpu_percent(interval=1)

# Function to calculate memory usage percentage
def get_memory_usage():
    memory = psutil.virtual_memory()
    return memory.percent

# Function to calculate disk usage percentage
def get_disk_usage():
    disk = psutil.disk_usage('/')
    return disk.percent

# Function to print all system details
def print_system_details():
    system_info = platform.uname()
    print(f"System: {system_info.system}")
    print(f"Node Name: {system_info.node}")
    print(f"Release: {system_info.release}")
    print(f"Version: {system_info.version}")
    print(f"Machine: {system_info.machine}")
    print(f"Processor: {system_info.processor}")

# Example usage
# if __name__ == "__main__":
#     print_system_details()
#     print(f"Battery Percentage: {get_battery_percentage()}%")
#     print(f"System Sound Percentage: {get_system_sound_percentage()}%")
#     print(f"CPU Usage: {get_cpu_usage()}%")
#     print(f"Memory Usage: {get_memory_usage()}%")
#     print(f"Disk Usage: {get_disk_usage()}%")
