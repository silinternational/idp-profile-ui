start:
	docker-compose pull
	docker-compose up -d

errors:
	docker-compose logs
	docker-compose exec idp cat /var/log/apache2/error.log
	
clean:
	docker-compose kill
	docker system prune -f
