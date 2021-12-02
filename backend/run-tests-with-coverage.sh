#!/usr/bin/env bash

docker-compose -f deploy/docker-compose-integration-tests-database.yml up -d

docker-compose -f deploy/docker-compose-tests-coverage-runner.yml build 

docker-compose -f deploy/docker-compose-tests-coverage-runner.yml run --rm runner

runner_status=$?

docker-compose -f deploy/docker-compose-integration-tests-database.yml down

exit $runner_status
