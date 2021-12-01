#!/usr/bin/env bash

docker-compose -p syscpe_local_db -f deploy/docker-compose-database.local.yml up -d

docker-compose -p syscpe_local_server -f deploy/docker-compose-unit-tests-coverage-runner.yml up
docker-compose -p syscpe_local_server -f deploy/docker-compose-unit-tests-coverage-runner.yml down

docker-compose -p syscpe_local_db -f deploy/docker-compose-database.local.yml down
