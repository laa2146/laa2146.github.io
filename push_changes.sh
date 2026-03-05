#!/bin/bash

# Define ANSI color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

COMMIT_MESSAGE="Automated commit"

echo -e "${GREEN}Starting automated Git process...${NC}"

# 1. git add all changes
echo -e "${GREEN}Adding all files...${NC}"
git add .
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: git add failed. Aborting.${NC}"
    exit 1
fi

# 2. git commit with a static message
echo -e "${GREEN}Committing changes with message: \"$COMMIT_MESSAGE\"...${NC}"
git commit -m "$COMMIT_MESSAGE"
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: git commit failed. Aborting.${NC}"
    exit 1
fi

# 3. git push
echo -e "${GREEN}Pushing changes to remote repository...${NC}"
git push
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: git push failed. Check your connection or permissions.${NC}"
    exit 1
fi

echo -e "${GREEN}Git process completed successfully!${NC}"
