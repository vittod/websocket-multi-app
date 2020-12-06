#!/bin/bash

if [[ $1 == "" ]]; then echo "No App name specified"; exit 0; fi

APP_NAME=$1

pushd bin > /dev/null

# get server path
pushd ../../server > /dev/null
TARGET_DIR_SERVER=$(pwd)
echo "Target server $TARGET_DIR_SERVER"
popd > /dev/null

# to js source, get path
pushd ../build/static/js  > /dev/null
SOURCE_DIR_JS=$(pwd)
echo "JS source dir $SOURCE_DIR_JS"

# to css source, get path and build manifest
pushd ../css > /dev/null
SOURCE_DIR_CSS=$(pwd)
echo "CSS source dir $SOURCE_DIR_CSS"
rm -f css-manifest.json

echo '[' >> css-manifest.json

for file in *.css
do
 echo "\"$file\"," >> css-manifest.json
done

sed -i '' '$ s/,$//g'  css-manifest.json

echo ']' >> css-manifest.json
# back to js source
popd > /dev/null

# build js manifest
rm -f js-manifest.json

echo '[' >> js-manifest.json

for file in *.js
do
 echo "\"$file\"," >> js-manifest.json
done

sed -i '' '$ s/,$//g'  js-manifest.json

echo ']' >> js-manifest.json
# back to bin
popd > /dev/null

TARGET_DESTINATION="$TARGET_DIR_SERVER/$APP_NAME"
mkdir -p "$TARGET_DESTINATION"

pushd $TARGET_DESTINATION > /dev/null
echo "Transfer build to target destination $TARGET_DESTINATION"
rm -rf js css

cp -r $SOURCE_DIR_JS .
cp -r $SOURCE_DIR_CSS .

popd > /dev/null


