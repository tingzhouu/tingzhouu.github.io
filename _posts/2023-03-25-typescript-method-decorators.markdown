---
layout: post
title: "TypeScript - Method Decorators"
date: 2023-03-25 23:17:01 +0800
---

TypeScript - Method Decorators

# Introduction

Decorators provide the option to structure your code _differently_.

What can be done with decorators, can also be achieved with usual TypeScript code.

Those who have largely been using JavaScript or TypeScript only may find the syntax of decorators to be foreign, and even confusing at times.

There are several popular open-source projects that heavily use decorators. Having this knowledge will come in handy. Some examples are:

- [TypeORM](https://github.com/typeorm/typeorm)
- [NestJS](https://github.com/nestjs/nest)
- [class-validator](https://github.com/typestack/class-validator)

## Simple Example

### Context

We have a class that mimics making a HTTP request to get the
stock price of a given ticker.


```typescript
class StockPriceFetcher {
  getStockPrice(ticker: string) {
    // WARNING: May get error
    return this.getStockPriceFromServer(ticker);
  }

  private getStockPriceFromServer(ticker: string) {
    // mimic http requests randomly failing
    if (Math.random() < 0.85) {
      throw new Error(`Http request failed, could not
        fetch stock price for ticker ${ticker}`);
    }

    // generate a random integer as the stock price
    return 50 + Math.floor(Math.random() * 30);
  }
}
```

Unfortunately, HTTP requests do not always succeed. We can make this
solution more robust by implementing a retry mechanism.

### Without method decorator

We modify `getStockPrice` method to retry if an error is thrown.

```typescript
class StockPriceFetcher {
  getStockPrice(ticker: string) {
    let retries = 0;
    const maxRetries = 2;
    while (retries < maxRetries) {
      try {
         return this.getStockPriceFromServer(ticker);
      } catch (error) {
        retries++;
      }
    }
    throw new Error(`Could not fetch stock price of
      ticker ${ticker} after ${retries} retries`);
   
  }

  private getStockPriceFromServer(ticker: string) {
    if (Math.random() < 0.85) {
      throw new Error(`Http request failed, could not
        fetch stock price for ticker ${ticker}`);
    }

    return 50 + Math.floor(Math.random() * 30);
  }
}

const stockPriceFetcher = new StockPriceFetcher();
stockPriceFetcher.getStockPrice("BRK.A");
```

### With method decorator

We create a method decorator `Retry` that takes in a single parameter `numRetries`.

Notice that this is _declarative_. We did not need to add the retry logic into the method.
Instead, we _declared_ usage of the retry mechanism when defining the method.

If there are other methods which require the same retry mechanism, we can 
use the `Retry` decorator, instead of updating the logic inside the methods.

```typescript
function Retry(maxRetries: number) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {

    /**
     * `descriptor.value` stores the method, which is
     * `getStockPrice` in our example.
     * 
     * `descriptor.value` is stored in a separate variable
     * `originalMethod` because we need to modify
     * `descriptor.value` with retry logic
     */
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      let retries = 0;
      while (retries < maxRetries) {
        try {
          return originalMethod.apply(this, args);
        } catch (error) {
          retries++;
        }
      }
      throw new Error(`Method threw error
        after ${retries} retries`);
    };
  };
}

class StockPriceFetcher {
  @Retry(3) // Use method decorator
  getStockPrice(ticker: string) {
    return this.getStockPriceFromServer(ticker);
  }

  private getStockPriceFromServer(ticker: string) {
    if (Math.random() < 0.85) {
      throw new Error(`Http request failed, could not
        fetch stock price for ticker ${ticker}`);
    }
    return 50 + Math.floor(Math.random() * 30);
  }
}

const stockPriceFetcher = new StockPriceFetcher();
stockPriceFetcher.getStockPrice("BRK.B");
```
