#!/usr/bin/env bash

docker-compose -p syscpe_local_db -f deploy/docker-compose-database.local.yml up -d

docker-compose -p syscpe_local_server -f deploy/docker-compose-server.local.yml up
docker-compose -p syscpe_local_server -f deploy/docker-compose-server.local.yml down

docker-compose -p syscpe_local_db -f deploy/docker-compose-database.local.yml down
