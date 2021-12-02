#!/usr/bin/env bash

docker-compose -f deploy/docker-compose-database.local.yml up -d

docker-compose -f deploy/docker-compose-migrations-runner.local.yml build
docker-compose -f deploy/docker-compose-migrations-runner.local.yml run --rm runner

runner_status=$?

docker-compose -f deploy/docker-compose-database.local.yml down

exit $runner_status