import requests
import os
from datetime import datetime, timedelta

def get_render_logs(service_name):
    # Get Render API token from environment variable
    render_token = os.getenv('RENDER_TOKEN')
    if not render_token:
        print("Error: RENDER_TOKEN environment variable not set")
        return

    # Calculate start time (last hour)
    start_time = datetime.now() - timedelta(hours=1)
    start_time_str = start_time.strftime('%Y-%m-%dT%H:%M:%SZ')

    # Make API request to get logs
    headers = {
        'Authorization': f'Bearer {render_token}',
        'Accept': 'application/json'
    }
    
    try:
        response = requests.get(
            f'https://api.render.com/v1/services/{service_name}/logs',
            headers=headers,
            params={'startTime': start_time_str}
        )
        response.raise_for_status()
        
        logs = response.json()
        print("\n=== Render Logs ===")
        for log in logs:
            print(f"{log['timestamp']}: {log['message']}")
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching logs: {e}")

if __name__ == "__main__":
    service_name = "mindflow-backend"
    get_render_logs(service_name)
