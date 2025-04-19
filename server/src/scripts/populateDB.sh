#!/bin/bash

# Ensure we're in the server directory
cd "$(dirname "$0")/.."

# Load environment variables
source ../../.env

# Run the population script
echo "Starting database population..."
node src/scripts/populateDatabase.js

echo "Database population completed!"