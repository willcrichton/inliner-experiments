#!/bin/bash
set -e

pip3 install virtualenv
virtualenv -p python3 .env
source .env/bin/activate

pip3 install --upgrade -r requirements.txt

jupyter contrib nbextension install --user
jupyter nbextension enable inliner/notebook --user
jupyter nbextension enable hide_input/main --user
jupyter nbextension enable freeze/main --user

mkdir -p deps
pushd deps
git clone -b v0.9.0 https://github.com/mwaskom/seaborn
cd seaborn
pip3 install -e .
popd
