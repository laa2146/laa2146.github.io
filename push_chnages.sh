#!/bin/bash

# Check if a commit message was provided as an argument
if [ -z "$1" ]; then
  echo "Error: No commit message provided."
  echo "Usage: ./git_automate.sh \"Your commit message\""
  exit 1
fi

COMMIT_MSG="$1"

# 1. Stage all changes (git add .)
echo "Staging all changes..."
git add .

# Check if 'git add .' was successful
if [ $? -ne 0 ]; then
  echo "Error: 'git add .' failed. Ensure you are in a git repository."
  exit 1
fi

# 2. Commit changes (git commit -m "$COMMIT_MSG")
echo "Committing with message: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

# Check if 'git commit' was successful
if [ $? -ne 0 ]; then
  echo "Error: 'git commit' failed. There may be nothing to commit."
  exit 1
fi

# 3. Push to the remote repository (git push)
echo "Pushing changes to remote repository..."
git push

# Check if 'git push' was successful
if [ $? -ne 0 ]; then
  echo "Error: 'git push' failed. Check your network connection and permissions."
  exit 1
fi

echo "Successfully added, committed, and pushed changes."