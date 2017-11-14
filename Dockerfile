FROM ubuntu:14.04
LABEL maintainer="knarfeh@outlook.com"

RUN \
  apt-get update \
  && apt-get install -y \
  build-essential \
  libfreetype6-dev \
  curl \
  python \
  libreadline-dev \
  libncurses5-dev \
  libpcre3-dev \
        libssl-dev \
        perl \
        make \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get -y autoclean
# The following requirements is required by openresty: libreadline-dev libncurses5-dev libpcre3-dev libssl-dev perl make build-essential
# Install openresty
ENV OPENRESTY_VERSION=1.11.2.2
RUN curl -O https://openresty.org/download/openresty-${OPENRESTY_VERSION}.tar.gz \
    && tar -xvf openresty-${OPENRESTY_VERSION}.tar.gz \
    && cd openresty-${OPENRESTY_VERSION}/ \
    && ./configure -j2 \
    && make -j2 \
    && make install \
    && cd .. \
    && rm openresty-${OPENRESTY_VERSION}.tar.gz \
    && rm -r openresty-${OPENRESTY_VERSION}
ENV PATH=/usr/local/openresty/bin:$PATH
ENV PATH=/usr/local/openresty/nginx/sbin:$PATH

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.11.1
ENV NPM_VERSION 5.4.2

# Install nvm with node and npm
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm@$NPM_VERSION

# Set up our PATH correctly
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm cache clear --force
RUN npm i -g @angular/cli typescript

COPY package.json ./
COPY package-lock.json ./
RUN npm i -D --verbose

COPY . /lqbw/
WORKDIR /lqbw

EXPOSE 4200

CMD ["npm", "run", "dev"]
