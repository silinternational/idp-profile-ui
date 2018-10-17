start:
	docker-compose pull
	docker-compose up -d

deps:
	npm install

dist: deps
	npm run build

dev: deps
	npm run serve

errors:
	docker-compose logs
	docker-compose exec idp cat /var/log/apache2/error.log
	
clean:
	docker-compose kill
	docker system prune -f
	npm run clean
