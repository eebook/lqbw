FROM ubuntu:14.04

MAINTAINER Jun He <knarfeh@outlook.com>

RUN apt-get update && apt-get install -y \
    python-dev \
    libpq-dev \
    nginx \
    curl \
    sqlite3 \
    redis-server

RUN curl https://bootstrap.pypa.io/get-pip.py | python

RUN easy_install supervisor
RUN easy_install supervisor-stdout
RUN pip install uwsgi

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/sites-enabled/default

RUN mkdir /var/log/knarfeh
RUN chmod +w /var/log/knarfeh

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY eebookorg.sh .
RUN chmod +x eebookorg.sh

EXPOSE 8080

CMD ["./eebookorg.sh"]

WORKDIR /eebookorg
COPY . /eebookorg


RUN ln -s /nginx.conf /etc/nginx/sites-enabled/eebookorg_nginx.conf

