/* tslint:disable:no-shadowed-variable */
import * as React from 'react';

// 定义字段枚举在 T 但不在 U 中
export type Exclude<T, U> = T extends U ? never : T;

// 从 T 中提出字段那些不在 K 枚举中的组合对象
export type Omit<T, K extends keyof Partial<T>> = Pick<T, Exclude<keyof T, K>>;

// 获取 T 中的 property 类型为 U 的组合对象
export type MatchingKeys<T, U, K extends keyof T = keyof T> = K extends keyof T
  ? T[K] extends U ? K : never
  : never;

// 与 MatchingKeys 相反
export type VoidKeys<T, U> = Exclude<keyof T, MatchingKeys<T, U>>;

export const withDefaultProps = <
  P extends { [key: string]: any },
  DP extends Partial<P>
>(
  defaultProps: DP,
  Component: React.ComponentType<P>
) => {
  // 提取出必须的属性
  type RequiredProps = Omit<P, Extract<keyof DP, string>>;
  // 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
  type Props = Partial<DP> & Required<RequiredProps>;

  Component.defaultProps = defaultProps;

  // 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
  return (Component as React.ComponentType<any>) as React.ComponentType<Props>;
};

// 反射单形参函数的传参
// @deprecated 弃用 ArgumentType 反射，用 typescript 自带推导函数 Parameter<T>[0]
export type ArgumentType<T extends (x: any) => any> = T extends (
  a: infer A
) => any
  ? A
  : any;

// 插入前置参数
export type InsertParamBefore<
  P,
  F extends (...args: any[]) => any
> = F extends (arg1: infer A1, arg2: infer A2, ...args: any[]) => infer R
  ? (param: P, arg1: A1, arg2: A2, ...args: any[]) => R
  : (param: P, ...args: any[]) => any;

/**
 * type T00 = Unpacked<string>;  // string
 * type T01 = Unpacked<string[]>;  // string
 * type T02 = Unpacked<() => string>;  // string
 * type T03 = Unpacked<Promise<string>>;  // string
 * type T04 = Unpacked<Unpacked<Promise<string>[]>>;  // string
 * type T05 = Unpacked<any>;  // any
 * type T06 = Unpacked<never>;  // never
 */
export type Unpacked<T> = T extends Array<infer U>
  ? U
  : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
      ? U
      : T extends { [key: string]: infer U } ? U : T;

export type UnpackedReactComponent<T> = T extends React.ComponentType<infer U>
  ? U
  : never;
