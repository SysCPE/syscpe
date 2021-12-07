#!/usr/bin/env bash

docker-compose -f deploy/docker-compose-database.local.yml up -d

docker-compose -f deploy/docker-compose-server.local.yml up
docker-compose -f deploy/docker-compose-server.local.yml down

docker-compose -f deploy/docker-compose-database.local.yml down
