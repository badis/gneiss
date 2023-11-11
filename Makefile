help:
	@echo   $(info make build:       | Build all services(UI, Rest API, GraphQL API, DB)) \
			$(info make up:          | Start all services)  \
			$(info make restart:     | Restart all services)  \
			$(info make down:        | Shutdown all services) \
			$(info make console:     | Start hasura console) \
			$(info make migrate:     | Run database migrations) \
			$(info make metadata:    | Apply hasura metadata) 

build:
	docker-compose build 

up:
	docker-compose up

restart:
	docker-compose restart 

down: 
	docker-compose down

console:
	cd console; make console 

migrate: 
	cd console; make migrate

metadata: 
	cd console; make metadata

.PHONY: build up restart down console migrate metadata
