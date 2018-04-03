start:
	docker-compose pull
	docker-compose up -d

errors:
	docker-compose logs

clean:
	docker-compose kill
	docker system prune -f
