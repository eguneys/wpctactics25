#!/bin/bash



ROUTES=""

cd dist
for f in $ROUTES 
do
  echo $f.html
  cp index.html $f.html
done