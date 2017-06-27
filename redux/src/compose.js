/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    // 直接返回接下俩传入的dispath，不对dispatch做任何的包装
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // 重点在这里
  // 
  // [mw_1, mw_2, mw_3].reduce((a, b) => (...args) => a(b(...args)))
  //
  // 第一次
  // a=mw_1, b=mw_2
  // _result = (...args) => mw_1(mw_2(...args))
  //
  // 第二次
  // a = (...args) => mw_1(mw_2(...args)), b=m2_3
  // _result = (...args) => a(b)
  // _result = (...args) => mw_1(mw_2(mw_3(...args)))
  // 即；
  // (...args) => mw_1(mw_2(mw_3(...args)))
  
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
