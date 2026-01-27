export default function (plop) {
  // ========================================
  // Frontend Generators
  // ========================================

  // React Component Generator (Atoms, Molecules, Modules)
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['atoms', 'molecules', 'modules'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[A-Z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Component name must be in PascalCase';
          }
          return 'Component name is required';
        },
      },
      {
        type: 'confirm',
        name: 'withProps',
        message: 'Include props interface?',
        default: true,
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          path: 'frontend/src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/component.hbs',
        },
        {
          type: 'add',
          path: 'frontend/src/components/{{type}}/{{pascalCase name}}/index.ts',
          template: 'export { {{pascalCase name}} } from "./{{pascalCase name}}";\n',
        },
      ];
      return actions;
    },
  });

  // React Hook Generator
  plop.setGenerator('hook', {
    description: 'Create a custom React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (camelCase, without "use" prefix):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[a-z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Hook name must be in camelCase';
          }
          return 'Hook name is required';
        },
      },
      {
        type: 'list',
        name: 'category',
        message: 'Hook category:',
        choices: ['api', 'ui', 'utils'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'frontend/src/hooks/{{category}}/use{{pascalCase name}}.ts',
        templateFile: 'plop-templates/hook.hbs',
      },
    ],
  });

  // Zustand Store Generator
  plop.setGenerator('store', {
    description: 'Create a new Zustand store',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Store name (camelCase):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[a-z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Store name must be in camelCase';
          }
          return 'Store name is required';
        },
      },
      {
        type: 'confirm',
        name: 'withPersist',
        message: 'Add persistence middleware?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'frontend/src/store/{{camelCase name}}.store.ts',
        templateFile: 'plop-templates/store.hbs',
      },
    ],
  });

  // Page Generator
  plop.setGenerator('page', {
    description: 'Create a new page component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Page name (PascalCase):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[A-Z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Page name must be in PascalCase';
          }
          return 'Page name is required';
        },
      },
      {
        type: 'confirm',
        name: 'protected',
        message: 'Is this a protected route?',
        default: false,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'frontend/src/pages/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/page.hbs',
      },
      {
        type: 'add',
        path: 'frontend/src/pages/{{pascalCase name}}/index.ts',
        template: 'export { {{pascalCase name}} } from "./{{pascalCase name}}";\n',
      },
    ],
  });

  // ========================================
  // Backend Generators
  // ========================================

  // Controller Generator
  plop.setGenerator('controller', {
    description: 'Create a new Spring Boot REST controller',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Controller name (PascalCase, without "Controller" suffix):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[A-Z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Controller name must be in PascalCase';
          }
          return 'Controller name is required';
        },
      },
      {
        type: 'input',
        name: 'path',
        message: 'API path (e.g., /api/v1/users):',
        default: '/api/v1/',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'backend/src/main/java/com/lorum/controllers/{{pascalCase name}}Controller.java',
        templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });

  // Service Generator
  plop.setGenerator('service', {
    description: 'Create a new Spring Boot service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Service name (PascalCase, without "Service" suffix):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[A-Z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Service name must be in PascalCase';
          }
          return 'Service name is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'backend/src/main/java/com/lorum/services/{{pascalCase name}}Service.java',
        templateFile: 'plop-templates/service.hbs',
      },
    ],
  });

  // Entity Generator
  plop.setGenerator('entity', {
    description: 'Create a new JPA entity',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Entity name (PascalCase):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[A-Z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'Entity name must be in PascalCase';
          }
          return 'Entity name is required';
        },
      },
      {
        type: 'input',
        name: 'table',
        message: 'Table name (snake_case):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[a-z_]+$/.test(value)
              ? true
              : 'Table name must be in snake_case';
          }
          return 'Table name is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'backend/src/main/java/com/lorum/models/{{pascalCase name}}.java',
        templateFile: 'plop-templates/entity.hbs',
      },
      {
        type: 'add',
        path: 'backend/src/main/java/com/lorum/repositories/{{pascalCase name}}Repository.java',
        templateFile: 'plop-templates/repository.hbs',
      },
    ],
  });

  // DTO Generator
  plop.setGenerator('dto', {
    description: 'Create a new DTO (Data Transfer Object)',
    prompts: [
      {
        type: 'input',
        name: 'domain',
        message: 'Domain/Module name (e.g., user, auth):',
      },
      {
        type: 'input',
        name: 'name',
        message: 'DTO name (PascalCase, can include suffix like "Request" or "Response"):',
        validate: (value) => {
          if (/.+/.test(value)) {
            return /^[A-Z][a-zA-Z0-9]*$/.test(value)
              ? true
              : 'DTO name must be in PascalCase';
          }
          return 'DTO name is required';
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'backend/src/main/java/com/lorum/dtos/{{lowerCase domain}}/{{pascalCase name}}.java',
        templateFile: 'plop-templates/dto.hbs',
      },
    ],
  });
}
