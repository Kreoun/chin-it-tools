```markdown
# chin-it-tools Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides guidance on contributing to the `chin-it-tools` TypeScript codebase. It covers established coding conventions, file organization, import/export styles, and testing patterns. While no explicit workflows or automation scripts are present, this guide outlines best practices for maintaining consistency and quality in your contributions.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `stringUtils.ts`, `dateHelper.ts`

### Import Style
- Both default and named imports are used.
  - Example (default import):
    ```typescript
    import myModule from './myModule';
    ```
  - Example (named import):
    ```typescript
    import { helperFunction } from './helperFunctions';
    ```

### Export Style
- Both default and named exports are present.
  - Example (default export):
    ```typescript
    export default function doSomething() { ... }
    ```
  - Example (named export):
    ```typescript
    export function calculateSum(a: number, b: number): number { ... }
    ```

### Commit Messages
- Freeform commit messages, often without strict prefixes.
- Average commit message length: ~71 characters.
  - Example:
    ```
    Add utility for date formatting and parsing
    ```

## Workflows

### Adding a New Utility Function
**Trigger:** When you need to add a new helper or utility to the toolkit  
**Command:** `/add-utility`

1. Create a new file in camelCase, e.g., `myNewUtility.ts`.
2. Write the utility function using TypeScript.
3. Export the function (default or named, as appropriate).
4. If needed, import the new utility in relevant modules.
5. Write a corresponding test file named `myNewUtility.test.ts`.
6. Commit your changes with a clear, descriptive message.

### Running Tests
**Trigger:** Before pushing changes or after adding new code  
**Command:** `/run-tests`

1. Identify test files (pattern: `*.test.*`).
2. Use the project's test runner (framework unknown; check project docs or package.json).
3. Run the test suite and ensure all tests pass.
4. Address any failures before committing.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `stringUtils.test.ts`
- Testing framework is not explicitly identified; check for test scripts in `package.json` or documentation.
- Place tests alongside or near the code they cover for clarity and maintainability.

## Commands
| Command        | Purpose                                 |
|----------------|-----------------------------------------|
| /add-utility   | Scaffold and add a new utility function |
| /run-tests     | Run the test suite                      |
```
