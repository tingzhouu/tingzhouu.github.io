---
layout: post
title: "TypeScript - Class Decorators"
date: 2023-03-18 17:00:01 +0800
---

TypeScript - Class Decorators

# Introduction

Decorators provide the option to structure your code _differently_.

What can be done with decorators, can also be achieved with usual TypeScript code.

Those who have largely been using JavaScript or TypeScript only may find the syntax of decorators to be foreign, and even confusing at times.

There are several popular open-source projects that heavily use decorators. Having this knowledge will come in handy. Some examples are:

- [TypeORM](https://github.com/typeorm/typeorm)
- [NestJS](https://github.com/nestjs/nest)
- [class-validator](https://github.com/typestack/class-validator)

# Simple Example

Let's try to model a cattle-farm with 2 breeds - Black Angus and Wagyu. We want to keep track of their breeds.

# Without class decorators

We will create a class `Cow` having the class property `breed`. `BlackAngus` and `Wagyu` will be child classes of `Cow`.

```typescript
class Cow {
  breed: string;

  constructor(breed: string) {
    this.breed = breed;
  }
}

class BlackAngus extends Cow {
  constructor() {
    super("black-angus");
  }
}

class Wagyu extends Cow {
  constructor() {
    super("wagyu");
  }
}

const blackAngus = new BlackAngus();
console.log(blackAngus.breed); // prints 'black-angus'

const wagyu = new Wagyu();
console.log(wagyu.breed); // prints 'wagyu'
```

# With class decorators

We will create a class decorator `Breed` that takes in a single parameter `breed`.

Notice that this is _declarative_. We did not need to store a class variable and add a constructor.
Instead, we _declared_ the cow's breed when defining the class.

```typescript
function Breed(breed: string): ClassDecorator {
  return function (target: object) {
    target["cowBreed"] = breed;
  };
}

class Cow {}

@Breed("black-angus")
class BlackAngus extends Cow {}

@Breed("wagyu")
class Wagyu extends Cow {}

const blackAngus = new BlackAngus();
console.log(blackAngus.constructor["cowBreed"]); // prints 'black-angus'

const wagyu = new Wagyu();
console.log(wagyu.constructor["cowBreed"]); // prints 'wagyu'
```
