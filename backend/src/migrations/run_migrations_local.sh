docker-compose -f docker-compose-migrations.database.local.yml up -d

docker-compose -f docker-compose-migrations.runner.yml build
docker-compose -f docker-compose-migrations.runner.yml run --rm runner

runner_status=$?

docker-compose -f docker-compose-migrations.database.local.yml down

exit $runner_status