import { isString, isArray, isObject } from './typeOf';

export function mergeClassName(
  preserveClassName: string,
  className?: string | { [key: string]: any } | any[]
): string {
  if (!className) {
    return preserveClassName;
  }
  const cls = [preserveClassName];

  switch (true) {
    case isString(className):
      cls.push(className as string);
      break;
    case isArray(className):
      cls.push(...(className as any[]).filter(d => !!d));
      break;
    case isObject(className):
      Object.keys(className).forEach(d => {
        if (className[d]) {
          cls.push(d);
        }
      });
      break;
    default:
      cls.push(String(className));
  }
  return cls.join(' ');
}

export function mergeStyles(preserveStyles, styles: React.CSSProperties) {
  if (!styles) {
    return preserveStyles;
  }
  const rtn = { ...preserveStyles };
  Object.keys(styles).forEach(key => {
    if (styles[key]) {
      rtn[key] = styles[key];
    }
  });
  return { ...styles, ...preserveStyles };
}
