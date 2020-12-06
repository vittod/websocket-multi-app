#!/bin/bash

BUILD_NAME='build-mutter'

pushd build > /dev/null
SOURCE_DIR=$(pwd)
popd > /dev/null

# get server path
pushd ../server > /dev/null
TARGET_DIR_SERVER=$(pwd)
echo $TARGET_DIR_SERVER
popd > /dev/null

TARGET_DESTINATION="$TARGET_DIR_SERVER/$BUILD_NAME"
echo "target dest.. $TARGET_DESTINATION"

rm -rf $TARGET_DESTINATION
mkdir -p $TARGET_DESTINATION

pushd $TARGET_DESTINATION > /dev/null
cp -r $SOURCE_DIR/. .
popd > /dev/null



