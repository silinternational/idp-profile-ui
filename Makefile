start: deps
	docker-compose pull
	docker-compose up -d proxy

deps:
	docker-compose run --rm node npm install

depsupdate:
	docker-compose run --rm node npm update
	docker-compose run --rm node npm ls --package-lock-only --json > installed-versions.json
	docker-compose run --rm dynamorestart composer install

dist: deps
	docker-compose run --rm node npm run build

logs:
	docker-compose logs
	docker-compose exec idp cat /var/log/apache2/error.log
	
phpmyadmin:
	docker-compose up -d brokerPhpmyadmin profilePhpmyadmin
	
clean:
	docker-compose run --rm node npm run clean
	docker-compose kill
	docker-compose rm -f

dynamoclean:
	docker-compose kill dynamorestart
	docker-compose up -d dynamorestart