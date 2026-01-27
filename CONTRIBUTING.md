# Contributing to Lorum

Thank you for contributing to Lorum! This guide will help you get started.

## Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0
- **Java** 17
- **Docker** and **Docker Compose**
- **Git**

## Getting Started

### 1. Initial Setup

```bash
# Install root dependencies (Lefthook, Plop, Commitlint)
pnpm install

# Install git hooks
pnpm prepare

# Create environment files
make env

# Start development environment
make dev
```

### 2. Development Workflow

The project uses **Lefthook** for git hooks that automatically run checks before commits and pushes:

- **Pre-commit**: Linting, formatting, and type-checking
- **Pre-push**: Running tests
- **Commit-msg**: Validating commit message format

You can skip hooks temporarily with:
```bash
LEFTHOOK=0 git commit -m "message"
```

### 3. Code Generation

Use **Plop** to generate boilerplate code:

```bash
# Interactive menu
pnpm generate

# Or directly via npx
npx plop component
npx plop hook
npx plop store
npx plop page
npx plop controller
npx plop service
npx plop entity
npx plop dto
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or dependency changes
- `ci`: CI/CD changes
- `chore`: Other changes that don't modify src or test files

### Scopes
- `frontend`: Frontend-specific changes
- `backend`: Backend-specific changes
- `docker`: Docker-related changes
- `deps`: Dependency updates
- `config`: Configuration changes
- `auth`: Authentication/authorization
- `ui`: UI/UX changes
- `api`: API changes
- `db`: Database changes

### Examples
```bash
feat(frontend): add dark mode toggle
fix(backend): resolve JWT refresh token expiration
docs(readme): update installation instructions
refactor(api): simplify error handling middleware
test(auth): add integration tests for login flow
```

## Code Style

### Frontend (TypeScript/React)

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: 100 char line width, 2-space indentation, single quotes
- **Imports**: Use path aliases (`@components`, `@hooks`, etc.)
- **Components**: Follow atomic design pattern (atoms → molecules → modules)
- **Naming**:
  - Components: `PascalCase`
  - Files: `PascalCase.tsx` for components
  - Hooks: `camelCase` with `use` prefix
  - Stores: `camelCase` with `.store.ts` suffix

### Backend (Java/Spring Boot)

- **Spotless**: Google Java Format with auto-formatting
- **Structure**: Follow layered architecture (controllers → services → repositories)
- **Naming**:
  - Classes: `PascalCase`
  - Methods: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Packages: `lowercase`

## Testing

### Frontend Tests

```bash
# Run all tests
pnpm test:frontend

# Watch mode
cd frontend && pnpm test:watch

# UI mode
cd frontend && pnpm test:ui

# Coverage
cd frontend && pnpm test -- --coverage
```

### Backend Tests

```bash
# Run all tests
pnpm test:backend

# Or directly
cd backend && ./mvnw test
```

## Project Structure

```
lorum/
├── frontend/                   # React + TypeScript frontend
│   ├── src/
│   │   ├── components/        # UI components (atoms, molecules, modules)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── store/             # Zustand stores
│   │   ├── providers/         # React context providers
│   │   ├── utils/             # Utility functions
│   │   ├── types/             # TypeScript type definitions
│   │   └── test/              # Test setup and utilities
│   ├── public/                # Static assets
│   └── [config files]
│
├── backend/                    # Spring Boot backend
│   └── src/main/java/com/lorum/
│       ├── controllers/       # REST endpoints
│       ├── services/          # Business logic
│       ├── repositories/      # Data access layer
│       ├── models/            # JPA entities
│       ├── dtos/              # Data transfer objects
│       ├── security/          # Security configuration
│       ├── config/            # Application configuration
│       ├── exceptions/        # Exception handlers
│       └── utils/             # Utility classes
│
├── plop-templates/            # Code generation templates
├── lefthook.yml               # Git hooks configuration
├── .commitlintrc.json         # Commit message rules
├── plopfile.js                # Code generator configuration
└── docker-compose*.yml        # Docker orchestration
```

## Common Commands

### Root Level

```bash
pnpm dev              # Start dev environment
pnpm prod             # Start production environment
pnpm down             # Stop containers
pnpm clean            # Clean everything
pnpm logs             # View logs
pnpm generate         # Generate code
pnpm lint             # Lint all code
pnpm format           # Format all code
pnpm type-check       # Type-check frontend
pnpm test             # Run all tests
```

### Frontend

```bash
cd frontend
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm type-check       # Type-check with TypeScript
pnpm test             # Run tests
pnpm validate         # Run all checks
```

### Backend

```bash
cd backend
./mvnw spring-boot:run           # Start server
./mvnw test                      # Run tests
./mvnw spotless:apply            # Format code
./mvnw spotless:check            # Check formatting
./mvnw clean install             # Build project
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Write tests** for new functionality

4. **Ensure all checks pass**
   ```bash
   pnpm validate
   pnpm test
   ```

5. **Commit with conventional format**
   ```bash
   git commit -m "feat(scope): description"
   ```

6. **Push and create PR**
   ```bash
   git push origin feat/your-feature-name
   ```

7. **Fill out the PR template** with:
   - Description of changes
   - Related issues
   - Testing performed
   - Screenshots (if UI changes)

## Troubleshooting

### Port Already in Use

```bash
# Stop all containers
make down

# Or find and kill process
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:8080 | xargs kill -9  # Backend
```

### Dependencies Out of Sync

```bash
# Frontend
cd frontend && pnpm install

# Backend
cd backend && ./mvnw clean install
```

### Git Hooks Not Running

```bash
# Reinstall Lefthook
pnpm prepare
lefthook install
```

### Database Issues

```bash
# Reset database
make clean
make dev
```

## Getting Help

- Open an issue for bugs or feature requests
- Check existing issues for similar problems
- Review closed PRs for examples

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
