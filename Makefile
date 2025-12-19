SHELL := /bin/sh
ENV_FILES := frontend/.env backend/.env

.PHONY: dev env

env:
	@for file in $(ENV_FILES); do \
		if [ ! -f $$file ]; then \
			example=$${file}.example; \
			if [ -f $$example ]; then \
				echo "Creating $$file from $$example"; \
				cp $$example $$file; \
			else \
				echo "Warning: $$example not found"; \
			fi; \
		fi; \
	done

dev:
	cd frontend && pnpm install && cd ..
	docker compose -f docker-compose.dev.yml up --build

prod:
	docker compose -f docker-compose.yml up --build -d

down:
	docker compose down

clean:
	docker compose down -v
	docker system prune -f

logs:
	docker compose logs -f