#!/bin/bash
set -e

zip experiment.zip experiment.ipynb scratchpad.ipynb experiment_state.pkl

echo "Created experiment.zip. Please send this file to Will."
