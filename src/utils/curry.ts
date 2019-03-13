/**
 * Currying params for function
 *
 * @export
 * @param {*} fn
 * @param {*} paramCount
 * @returns
 */
// tslint:disable-next-line:ban-types
export function curry(fn: Function, paramCount: number): Function {
  let i = 0;
  let rtn = fn;
  while (i++ < paramCount) {
    const f = rtn;
    rtn = (...args) => f.bind(null, ...args);
  }
  return rtn;
}

/**
 * Prebound params for function.
 *
 * @export
 * @param {Function} fn  函数
 * @param {any[]} bindArgs  要 Curry 化的参数
 * @returns
 */
export function unary<T, TResult, Rest>(
  fn: (arg1: T, ...restArgs: Rest[]) => TResult,
  ...bindArgs: Rest[]
): (...args: Rest[]) => TResult {
  return (...args) => {
    return fn.apply(null, bindArgs.concat(args));
  };
}