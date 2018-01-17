#!/bin/bash

APP=tssf-app

if [ -e "$APP" ]; then
    echo "moving old app to a non-versioned dir"
    mv "$APP" "norepo-$APP-$(date "+%Y-%m-%d_%H-%M-%S")"
fi

yarn add -D create-react-app

create-react-app "$APP"  --scripts-version=react-scripts-ts

echo "clearing out top level node project"
rm -rf node_modules package.json yarn.lock
