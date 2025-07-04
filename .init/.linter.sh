#!/bin/bash
cd /home/kavia/workspace/code-generation/serenehue-mood--art-explorer-105425-7343c845/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

