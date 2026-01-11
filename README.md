# ts-codemod-lib

[![npm version](https://img.shields.io/npm/v/ts-codemod-lib.svg)](https://www.npmjs.com/package/ts-codemod-lib)
[![npm downloads](https://img.shields.io/npm/dm/ts-codemod-lib.svg)](https://www.npmjs.com/package/ts-codemod-lib)
[![License](https://img.shields.io/npm/l/ts-codemod-lib.svg)](./LICENSE)
[![codecov](https://codecov.io/gh/noshiro-pf/ts-codemod-lib/graph/badge.svg?token=BVx5UgsiVr)](https://codecov.io/gh/noshiro-pf/ts-codemod-lib)

A TypeScript library for building codemods and AST transformations powered by [ts-morph](https://github.com/dsherret/ts-morph).

## Overview

`ts-codemod-lib` provides utilities and CLI tools for automated TypeScript code transformations. It enables you to programmatically modify TypeScript source code through AST manipulation, making it ideal for large-scale refactoring tasks.

## Features

- **AST-based Transformations**: Leverage ts-morph for reliable type-aware code transformations
- **Ready-to-use CLI Tools**: Convert interfaces to types, add readonly modifiers, and more
- **Extensible API**: Build custom transformers using the provided utilities
- **Type-safe**: Written in TypeScript with strict type checking

## Installation

```bash
npm install ts-codemod-lib
# or
pnpm add ts-codemod-lib
# or
yarn add ts-codemod-lib
```

## CLI Tools

This package provides several command-line tools for common TypeScript transformations:

### convert-to-readonly

Adds `readonly` modifiers to type definitions throughout your codebase.

```bash
npx convert-to-readonly <baseDir> [--exclude <pattern>] [--silent]
```

**Options:**

- `baseDir`: Base directory to scan for TypeScript files
- `--exclude`: Glob patterns to exclude (e.g., `"src/generated/**/*.mts"`)
- `--silent`: Suppress output messages

### convert-interface-to-type

Converts TypeScript interface declarations to type aliases.

```bash
npx convert-interface-to-type <baseDir> [--exclude <pattern>] [--silent]
```

### replace-record-with-unknown-record

Replaces `Record<string, T>` with `UnknownRecord<T>` for better type safety.

```bash
npx replace-record-with-unknown-record <baseDir> [--exclude <pattern>] [--silent]
```

## Programmatic Usage

You can also use the transformation functions programmatically:

```typescript
import {
    transformSourceCode,
    convertToReadonlyTypeTransformer,
    convertInterfaceToTypeTransformer,
} from 'ts-codemod-lib';

// Apply transformations to source code
const transformed = transformSourceCode(
    sourceCode,
    isTsx,
    [convertToReadonlyTypeTransformer(), convertInterfaceToTypeTransformer()],
    debug,
);
```

### Creating Custom Transformers

```typescript
import type { TsMorphTransformer } from 'ts-codemod-lib';
import type * as tsm from 'ts-morph';

const myCustomTransformer: TsMorphTransformer = (
    sourceFile: tsm.SourceFile,
) => {
    // Your AST transformation logic here
    sourceFile.getClasses().forEach((classDecl) => {
        // Modify class declarations
    });
};
```

## Documentation

- API reference: <https://noshiro-pf.github.io/ts-codemod-lib/>

## Local Setup

```sh
git clone https://github.com/noshiro-pf/ts-codemod-lib.git
git submodule update --init --recursive
pnpm i
```

## Syncing AGENTS.md Updates

1. Update `AGENTS.md` in the common repository (`common-agent-config`)
2. Update the submodule in each project

```bash
git submodule update --remote --merge
git add agents/common
git commit -m "Update AGENTS.md"
```
