help:
	@echo   $(info make dev:        | Start dev environment for UI, Rest API, GraphQL API, DB) \
			$(info make down:       | Shutdown dev environment) 
			$(info make testui:     | Test UI) \
			$(info make testapi:    | Test API) \
			$(info make test:       | Test)  

dev:
	docker-compose up -d

down: 
	docker-compose down

testui:
	cd ui; npm run test:unit; npm run test:e2e

testapi:
	cd api; npm test

test: testui testapi

amend:
	git commit --amend --no-edit && git push -f

.PHONY: dev down testui testapi test amend
