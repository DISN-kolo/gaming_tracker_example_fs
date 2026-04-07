all:
	docker compose -f docker-compose.yml up --build

down:
	docker compose -f docker-compose.yml down

clean:
	if [ -n "$$(docker ps -qa)" ]; then docker stop $$(docker ps -qa); fi
	if [ -n "$$(docker ps -qa)" ]; then docker rm $$(docker ps -qa); fi
	if [ -n "$$(docker images -qa)" ]; then docker rmi -f $$(docker images -qa); fi

fclean: clean
	if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q); fi

.PHONY: all down clean fclean
