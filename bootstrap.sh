#! /usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv EA312927

echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" \
    | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

apt-get update && apt-get upgrade -y

apt-get install -y mongodb-org

curl -sL https://deb.nodesource.com/setup_6.x | bash -

apt-get install -y nodejs

npm install --global gulp

(cd /srv/mean && gulp)
