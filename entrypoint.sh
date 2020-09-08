#!/bin/sh
for file in /app/js/*.js;
do
  if [ ! -f $file.tmpl.js ]; then
    cp $file $file.tmpl.js
  fi
  envsubst '$VUE_APP_API_ROOT' < $file.tmpl.js > $file
done
echo "Starting Nginx"
nginx -g 'daemon off;'