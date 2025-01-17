/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-inner-declarations */


export namespace Iterable {
  export function unwrapArray<T>(iterable: Iterable<T>): T[] {
    if(Array.isArray(iterable))
      return iterable;

    return Array.from(iterable);
  }

  export function findLastIndex<T>(arr: Iterable<T>, predicate: (value: T) => boolean): number {
    arr = unwrapArray(arr);

    for(let i = (arr as T[]).length; i >= 0; i--) {
      if(predicate((arr as T[])[i]))
        return i;
    }
  
    return -1;
  }
}

export default Iterable;
