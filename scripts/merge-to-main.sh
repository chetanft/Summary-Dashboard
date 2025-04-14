#!/bin/bash

# Script to merge feature branches into main

# Ensure we're in the project root
cd "$(dirname "$0")/.." || exit 1

# Get current branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
echo "Current branch: $CURRENT_BRANCH"

# Check if we're on a feature branch
if [[ "$CURRENT_BRANCH" != feature/* ]]; then
  echo "Error: Not on a feature branch. Current branch is $CURRENT_BRANCH"
  echo "Please checkout a feature branch first."
  exit 1
fi

# Make sure we have the latest changes
echo "Fetching latest changes..."
git fetch origin

# Checkout main
echo "Checking out main branch..."
git checkout main

# Pull latest changes from main
echo "Pulling latest changes from main..."
git pull origin main

# Merge the feature branch
echo "Merging $CURRENT_BRANCH into main..."
git merge "$CURRENT_BRANCH"

# Push changes to main
echo "Pushing changes to main..."
git push origin main

# Go back to the feature branch
echo "Checking out $CURRENT_BRANCH..."
git checkout "$CURRENT_BRANCH"

echo "Done! $CURRENT_BRANCH has been merged into main."
