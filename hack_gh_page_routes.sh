#!/bin/bash



ROUTES="dashboard
profile"

cd dist
for f in $ROUTES 
do
  echo $f.html
  cp index.html $f.html
done