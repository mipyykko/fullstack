#!/bin/sh
npm run build
echo $?
if [ $? -eq 0 ]; then
  cp -r build ~/kurssit_paikallinen/fullstack-viikko3/public
fi
