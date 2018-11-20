#!/bin/bash

sudo apt-get update
sudo apt-get install mysql-client-core-5.7mysql
sudo apt-get install -y apache2
sudo apt-get install -y php7.2
#sudo apt-get install -y libapache2-mod-php7.2
sudo apt-get isntall -y php7.2-mysql
sudo apt-get install -y git
sudo apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get update && sudo apt-get install -y nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
cd /home
sudo git clone https://github.com/tarkvaraprojekt-2019/Tarkvaraprojekt.git
cd /frontend
sudo yarn install
sudo yarn build
sudo cp -r public/ ../
cd ../test_conf
sudo cp testsite.conf /etc/apache2/sites-available
sudo a2enmod rewrites
sudo a2enmod headers
sudo a2enmod deflate
sudo a2dissite 000-default.conf
sudo a2ensite testsite.conf
sudo apache2ctl restart