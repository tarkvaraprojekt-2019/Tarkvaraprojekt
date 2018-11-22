#!/bin/bash

sudo git pull
cd frontend ; sudo yarn install ; sudo yarn build ; sudo rm -rf ../public ; sudo cp -r public/ ../