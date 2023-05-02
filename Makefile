.PHONY: dev down testui testapi test
dev:
	docker-compose up --build
down: 
	docker-compose down
testui:
	cd ui; npm test
testapi:
	cd api; npm test
test: testui testapi


