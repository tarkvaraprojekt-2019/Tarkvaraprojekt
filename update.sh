#!/bin/bash

sudo git pull
cd /home/Tarkvaraprojekt/frontend && sudo yarn install && sudo yarn build && sudo cp -r public/ ../
