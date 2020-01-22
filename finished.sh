#!/bin/bash
set -e

zip -r experiment.zip scratchpad.ipynb deps screen.*

echo "Created experiment.zip. Please upload this file to Dropbox."
