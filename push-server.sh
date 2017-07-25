#!/usr/bin/env bash

# Please add below ref
#  git remote add server git@github.com:venturepact/og-build.git


BRANCH="master"
CONFIG_ENV=" --env=prod --prod --aot --output-hashing none"

if [ "$1" = "production" ]
then
    BRANCH="production"
    CONFIG_ENV=" --prod --env=$1 --aot --output-hashing none"
fi

if [ "$1" = "biz" ]
then
    BRANCH="biz"
    CONFIG_ENV=" --env=$1"

fi

if [ "$1" = "us" ]
then
    BRANCH="us"
    CONFIG_ENV=" --prod --env=$1 --aot --output-hashing none"

fi

if [ "$1" = "ogdev" ]
then
    BRANCH="satnamoutgrow"
    CONFIG_ENV=" --prod --env=$1 --aot --output-hashing none"
fi

if [ "$1" = "admin" ]
then
    BRANCH="admin"
    CONFIG_ENV=" --prod --env=$1 --aot --output-hashing none"
fi

#node --max_old_space_size=7200 ./node_modules/.bin/ng build $CONFIG_ENV --no-sourcemap
ng build $CONFIG_ENV --no-sourcemap

read -p "Are you sure you want to push these changes to $1 server?(y/n): "  -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # do dangerous stuff
    cd ../og-build
    git checkout . && git checkout $BRANCH
    git pull origin $BRANCH -Xours
    rm -rf *
    cp -r ../Outgrow-frontend/dist/* .
    git add *
    now=$(date +"%m-%d-%Y at %H.%M.%S")
    git commit -am "$1  Build at $now"
    git push origin $BRANCH
    cd ../Outgrow-frontend
fi

