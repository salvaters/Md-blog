---
title: TypeScript类型系统详解
date: 2024-11-15
description: 深入理解TypeScript的类型系统和高级类型特性
---

# TypeScript类型系统详解

TypeScript为JavaScript添加了强大的类型系统，让我们能够在开发时捕获错误并提供更好的代码提示。

## 基础类型

### 1. 原始类型

```typescript
// 基础类型
let name: string = "张三"
let age: number = 30
let isStudent: boolean = true
let hobbies: string[] = ["编程", "阅读", "音乐"]

// 元组类型
let person: [string, number] = ["Alice", 25]

// 枚举类型
enum Color {
  Red,
  Green,
  Blue
}
```

### 2. 接口和类型别名

```typescript
// 接口定义
interface User {
  name: string
  age: number
  email?: string  // 可选属性
  readonly id: number  // 只读属性
}

// 类型别名
type ID = string | number
type UserStatus = 'active' | 'inactive' | 'pending'
```

## 高级类型

### 1. 联合类型和交叉类型

```typescript
// 联合类型
type StringOrNumber = string | number

// 交叉类型
interface Person {
  name: string
}
interface Employee {
  id: number
}
type EmployeePerson = Person & Employee
```

### 2. 泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

// 泛型接口
interface Box<T> {
  contents: T
}

let numberBox: Box<number> = { contents: 42 }
```

### 3. 条件类型

```typescript
// 条件类型
type IsString<T> = T extends string ? true : false

type Test1 = IsString<string>  // true
type Test2 = IsString<number>  // false
```

## 类型推断和类型守卫

TypeScript能够智能推断类型，同时我们可以使用类型守卫来缩窄类型范围。

通过强大的类型系统，TypeScript帮助我们在开发阶段就发现潜在的错误，提高代码质量和开发效率。