#!/bin/bash

# Get Render API token from environment variable
RENDER_TOKEN="${RENDER_TOKEN}"
SERVICE_NAME="mindflow-backend"

# Make API request to get logs
response=$(curl -s -H "Authorization: Bearer ${RENDER_TOKEN}" "https://api.render.com/v1/services/${SERVICE_NAME}/logs")

# Check if request was successful
if [ $? -eq 0 ]; then
    echo "Successfully fetched logs:"
    echo "${response}"
else
    echo "Failed to fetch logs"
fi
