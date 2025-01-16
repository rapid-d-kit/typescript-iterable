/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-inner-declarations */


export namespace Iterator {
  export function isIterable<T>(arg: unknown): arg is Iterable<T> {
    __brandAnd(arg);
    return arg && typeof arg === 'object' && typeof arg[Symbol.iterator] === 'function';
  }

  const _empty: Iterable<any> = Object.freeze([]);

  export function empty<T = any>(): Iterable<T> {
    return _empty;
  }

  export function* single<T>(element: T): Iterable<T> {
    yield element;
  }

  export function wrap<T>(iterableOrElement: T | Iterable<T>): Iterable<T> {
    if(isIterable(iterableOrElement))
      return iterableOrElement;

    return single(iterableOrElement);
  }

  export function from<T>(iterable: Iterable<T> | null | undefined): Iterable<T> {
    return iterable || _empty;
  }

  export function* reverse<T>(arr: T[]): Iterable<T> {
    for(let i = arr.length - 1; i >= 0; i--) {
      yield arr[i];
    }
  }

  export function isEmpty<T>(iterable: Iterable<T> | null | undefined): boolean {
    return !iterable || iterable[Symbol.iterator]().next().done === true;
  }

  export function first<T>(iterable: Iterable<T>): T | undefined {
    return iterable[Symbol.iterator]().next().value;
  }

  export function some<T>(
    iterable: Iterable<T>,
    predicate: (value: T, i: number) => unknown,
  ): boolean {
    let i = 0;

    for(const element of iterable) {
      if(predicate(element, i++))
        return true;
    }

    return false;
  }

  export function find<T, R extends T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: number) => value is R
  ): R | undefined;

  export function find<T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: number) => boolean
  ): T | undefined;

  export function find<T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: number) => boolean,
  ): T | undefined {
    let i = 0;

    for(const element of iterable) {
      if(predicate(element, i++))
        return element;
    }

    return void 0;
  }

  // @ts-expect-error Compiler does not recognize the function implementation
  export function fitler<T, R extends T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: number) => value is R
  ): Iterable<R>;

  export function filter<T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: number) => boolean
  ): Iterable<T>;

  export function* filter<T>(
    iterable: Iterable<T>,
    predicate: (value: T, index: number) => boolean,
  ): Iterable<T> {
    let i = 0;

    for(const element of iterable) {
      if(predicate(element, i++))
        yield element;
    }
  }

  export function* map<T, R>(
    iterable: Iterable<T>,
    fn: (value: T, index: number) => R,
  ): Iterable<R> {
    let i = 0;

    for(const element of iterable) {
      yield fn(element, i++);
    }
  }

  export function* concat<T>(...iterables: (Iterable<T> | T)[]): Iterable<T> {
    for(const item of iterables) {
      if(isIterable(item)) {
        yield* item;
      } else {
        yield item;
      }
    }
  }

  export function reduce<T, R>(
    iterable: Iterable<T>,
    reducer: (prev: R, current: T) => R,
    initial: R,
  ): R {
    let value = initial;

    for(const element of iterable) {
      value = reducer(value, element);
    }

    return value;
  }

  export function* slice<T>(
    arr: readonly T[],
    from: number,
    to: number = arr.length,
  ): Iterable<T> {
    if(from < -arr.length) {
      from = 0;
    }

    if(from < 0) {
      from += arr.length;
    }

    if(to < 0) {
      to += arr.length;
    } else if(to > arr.length) {
      to = arr.length;
    }

    for(; from < to; from++) {
      yield arr[from];
    }
  }

  export function consume<T>(
    iterable: Iterable<T>,
    atMost: number = Number.POSITIVE_INFINITY,
  ): [T[], Iterable<T>] {
    const consumed: T[] = [];

    if(atMost === 0)
      return [consumed, iterable];

    const iterator = iterable[Symbol.iterator]();

    for(let i = 0; i < atMost; i++) {
      const next = iterator.next();

      if(next.done)
        return [consumed, empty()];

      consumed.push(next.value);
    }

    return [consumed, { [Symbol.iterator]() { return iterator; } }];
  }

  export async function asyncToArray<T>(iterable: AsyncIterable<T>): Promise<T[]> {
    const result: T[] = [];

    for await (const item of iterable) {
      result.push(item);
    }

    return Promise.resolve(result);
  }
}


function __brandAnd(arg: unknown): asserts arg is any { }

export default Iterator;
