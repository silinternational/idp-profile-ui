start:
	docker-compose pull
	docker-compose up -d

# TODO: are there error logs available in this env? 
# errors:
# 	docker-compose exec hub cat /var/log/apache2/error.log
# 	docker-compose exec idp1 cat /var/log/apache2/error.log
# 	docker-compose exec idp2 cat /var/log/apache2/error.log
# 	docker-compose exec idp4 cat /var/log/apache2/error.log
# 	docker-compose exec hub2 cat /var/log/apache2/error.log
# 	docker-compose exec idp3 cat /var/log/apache2/error.log

clean:
	docker-compose kill
	docker system prune -f