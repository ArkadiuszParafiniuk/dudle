#!/bin/bash
mvn clean install
docker rmi $(docker images 'aparafiniuk/chef' -q)
docker build --tag=aparafiniuk/chef:latest .
docker push aparafiniuk/chef:latest