#!/bin/bash
docker rmi $(docker images 'aparafiniuk/dudle' -q)
docker build -t aparafiniuk/dudle:latest .
docker push aparafiniuk/dudle:latest