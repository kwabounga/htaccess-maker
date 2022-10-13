#!/bin/bash

# Script to rename all file in current directory > sub directories

# 1- put the file in the current directory
# 2- execute ./rename.sh .old .new
#  ex:  ./rename.sh .css .less
# will rename all *.css files into *.less


for file in $(find . -name "*$1"); do
  mv "$file" "${file%$1}$2"
done
