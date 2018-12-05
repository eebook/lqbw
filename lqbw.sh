#!/bin/sh
pm2 start ./conf/pm2/prod.conf.json

nginxConf='/etc/nginx/sites-enabled/nginx.conf'
mkdir -p /etc/nginx/sites-enabled/
mkdir -p /etc/nginx/sites-enabled/logs

if [ -f "$nginxConf" ]; then
    rm $nginxConf
fi

echo 'Running in prod stage'
ln -s /lqbw/conf/nginx/nginx.conf $nginxConf

cp /lqbw/conf/nginx/mine.types /etc/nginx/sites-enabled/mime.types

nginx -p /etc/nginx/sites-enabled/ -c /etc/nginx/sites-enabled/nginx.conf
