#!/bin/bash

# Deploy script for about-me-page
echo "Deploying to server..."

# Server details
SERVER="root@46.101.162.160"
REMOTE_PATH="/var/www/html"

# Files to deploy
FILES="index.html style.css script.js"

# Upload files
scp $FILES $SERVER:$REMOTE_PATH/

echo "Deployment complete!"
