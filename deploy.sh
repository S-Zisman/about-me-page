#!/bin/bash

# Deploy script for about-me-page
echo "Deploying to server..."

# Server details
SERVER="root@46.101.162.160"
REMOTE_PATH="/var/www/html"

# Files to deploy
FILES="index.html index-en.html style.css script.js language-detector.js supabase-config.js"

# Check if SSH key exists
if [ -f ~/.ssh/claude-access ]; then
    echo "Using SSH key for deployment..."
    scp -i ~/.ssh/claude-access $FILES $SERVER:$REMOTE_PATH/
else
    echo "Using default SSH for deployment..."
    scp $FILES $SERVER:$REMOTE_PATH/
fi

echo "Deployment complete!"
