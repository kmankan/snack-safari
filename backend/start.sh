#!/bin/sh
docker rm -vf $(docker ps -aq)
docker rmi -f $(docker images -aq)

docker-compose up
