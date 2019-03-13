const MAPS = [
  'string',
  'boolean',
  'number',
  'regexp',
  'object',
  'null',
  'function',
  'asyncfunction',
  'undefined',
  'date',
  'array',
  'symbol',
  'promise',
  'bigint'
].reduce((rtn, key) => {
  rtn[`[object ${key}]`] = key;
  return rtn;
}, {});

export default function typeOf(
  v
):
  | 'string'
  | 'boolean'
  | 'number'
  | 'regexp'
  | 'object'
  | 'null'
  | 'function'
  | 'asyncfunction'
  | 'undefined'
  | 'date'
  | 'array'
  | 'symbol'
  | 'promise'
  | 'bigint' {
  return MAPS[Object.prototype.toString.call(v).toLowerCase()];
}

export function isNumber(v): v is number {
  return typeOf(v) === 'number';
}

export function isNull(v): v is null {
  return typeOf(v) === 'null';
}

export function isUndefined(v): v is undefined {
  return typeOf(v) === 'undefined';
}

export function isObject(v): v is object {
  return typeOf(v) === 'object';
}

export function isDate(v): v is Date {
  return typeOf(v) === 'date';
}

// tslint:disable-next-line:ban-types
export function isFunction(v): v is Function {
  return typeOf(v) === 'function' || typeOf(v) === 'asyncfunction';
}

// tslint:disable-next-line:ban-types
export function isAsyncFunction(v): v is Function {
  return typeOf(v) === 'asyncfunction';
}

export function isRegExp(v): v is RegExp {
  return typeOf(v) === 'regexp';
}

export function isArray(v): v is any[] {
  return typeOf(v) === 'array';
}

export function isString(v): v is string {
  return typeOf(v) === 'string';
}

export function isSymbol(v): v is symbol {
  return typeOf(v) === 'symbol';
}

export function isPromise(v): v is Promise<any> {
  return typeOf(v) === 'promise';
}

export type Primitive = boolean | string | number | null;

export function isPrimitive(v: any): v is Primitive {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean' ||
    v === null ||
    v === undefined
  );
}
