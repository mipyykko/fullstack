#!/bin/sh
rm -rf build
cd ../bloglist-frontend
npm run build
cp -R build ../blogilista
cd ../blogilista