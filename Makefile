COMPOSE = docker compose -f docker-compose.yml
ifdef dev
COMPOSE += -f docker-compose.dev.yml
endif

all:
	$(COMPOSE) up --build

down:
	$(COMPOSE) down

clean:
	if [ -n "$$(docker ps -qa)" ]; then docker stop $$(docker ps -qa); fi
	if [ -n "$$(docker ps -qa)" ]; then docker rm $$(docker ps -qa); fi
	if [ -n "$$(docker images -qa)" ]; then docker rmi -f $$(docker images -qa); fi

fclean: clean
	if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q); fi

# usage: make migrate-add name=YourMigrationName
migrate-add:
	docker compose exec back dotnet ef migrations add $(name) --project Ggs.Api

migrate-apply:
	docker compose exec back dotnet ef database update --project Ggs.Api

# usage: make migrate-revert to=PreviousMigrationName
migrate-revert:
	docker compose exec back dotnet ef database update $(to) --project Ggs.Api

migrate-status:
	docker compose exec back dotnet ef migrations list --project Ggs.Api

.PHONY: all down clean fclean migrate-add migrate-apply migrate-revert migrate-status
