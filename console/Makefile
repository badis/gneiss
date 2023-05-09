help:
	@echo   $(info make status:  | Show migrations status) \
			$(info make up:      | Apply the last non applied migration) 
			$(info make down:    | Rollback the last migration) \
			$(info make migrate: | Apply migration) \
			$(info make metadata:| Apply metadata) \
			$(info make console: | Show hasura console)  
	
status:  
	hasura migrate status --database-name gneiss_db --skip-update-check  --admin-secret adminsecret
up:
	hasura migrate apply --up 1 --database-name gneiss_db --skip-update-check  --admin-secret adminsecret
down:
	hasura migrate apply --down 1 --database-name gneiss_db --skip-update-check  --admin-secret adminsecret
migrate:
	hasura migrate apply --database-name gneiss_db --skip-update-check  --admin-secret adminsecret
metadata:
	hasura metadata apply --skip-update-check --admin-secret adminsecret && hasura metadata reload --skip-update-check  --admin-secret adminsecret
console:
	hasura console --skip-update-check --console-port 9095 --api-port 9093 --admin-secret adminsecret

.PHONY: help  status up down migrate metadata console 
