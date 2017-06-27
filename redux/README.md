# Redux 源码解析
## combineReducers 都做了什么？
在合并 `reducer` 的过程到底发生了什么？先看完以下的精简的源代码：

```js
export default function combineReducers(reducers) {
  // 1. 每个reducer会被组装成键值对的形式 {reducer_1, reducer_2}
    const finalReducers = {}
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]
    // reducer 必须是函数
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)
  try {
    // 2. 确保每个 reducer 的返回值不为 undefined（可以为 null ）
    assertReducerShape(finalReducers)
  } 
  // 3. 返回一个 reducer ! 这个 reducer 返回了整个状态树
  return function combination(state = {}, action) {
    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      // 遍历并调用每个reducer，传入state和action
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
      // 只要有一个state改变了，那么久返回新的state
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
```

这样 `redux` 细致的处理流程就一目了然了，不过我们要注意几个重要的问题：

- 注意 `redux` 是怎么判断状态树发生改变的 `hasChanged || nextStateForKey !== previousStateForKey` 

很明显的浅比较，这就是为什么当某个 state 改变的时候，为什么要这样返回 `return {...state, {name: 'newName'}}`

- 如果改变了，最后返回的是 `nextState` ，一个全新的状态树，这就代表着，`react` 可能要进行很多不必要的 diff

## createStore
```js
export const ActionTypes = {
  INIT: '@@redux/INIT'
}
export default function createStore(reducer, preloadedState, enhancer) {
  // 如果enhancer存在，那么她必须是一个function
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState)
  }
  let currentReducer = reducer
  let currentState = preloadedState
  function getState() {
    return currentState
  }
  function replaceReducer(nextReducer) {
    currentReducer = nextReducer
    dispatch({ type: ActionTypes.INIT })
  }
  dispatch({ type: ActionTypes.INIT })
  return { dispatch, subscribe, getState, replaceReducer, [$$observable]: observable
  }
}
```

createStore 的逻辑精简下来，也是非常的清楚明了。我们需要注意到的是，`redux` 在初始化 `store` 的时候，会 `dispatch` 一次 `{type: @@redux/INIT'}` ，那我们先来看看 `dipatch` 都做了什么：

```js
let isDispatching = false
let currentListeners = []
let nextListeners = currentListeners
function dispatch(action) {
  if (isDispatching) {
    throw new Error('Reducers may not dispatch actions.')
  }
  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }
  const listeners = currentListeners = nextListeners
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }
  return action
}
```

原来 `dispatch` 的做的事情是如此的轻松，就是把 `state` 传入 `reducer` 的函数调用，而下面的也只是每次调用的时候，遍历调用监听函数。

`store` 的 API 是可扩展的，监听函数可以尽可能垂直式的影响 `store` ， [参考更多](https://github.com/reactjs/redux/issues/303#issuecomment-125184409)。

尽量不要使用 `subscribe` 底层 API，可以适当的封装一下：

```js
function toObservable(store) {
  return {
    subscribe({ onNext }) {
      let dispose = store.subscribe(() => onNext(store.getState()));
      onNext(store.getState());
      return { dispose };
    }
  }
}
```

然后我们再来看看 `redux` 提供给我们另外三个非常值得围观的两个高阶函数: `applyMiddleware` , `compose`

## applyMiddleware
```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
      // createStore 可以是增强的 store 方法，所以通过参数传入
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    // middlewares 也是高阶函数，先传入 Store API
    chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 依次调用 chain，返回像被被流水线加工后的 dispatch
    dispatch = compose(...chain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}

```

这个 `compose` 函数做的事情应该很简单，挨个调用 `chain` 中的每个 `middleware` 然后返回最后的 `dispatch` ，让我们看看 `redux` 是怎么实现的。

## compose
```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    // 直接返回接下俩传入的dispath，不对dispatch做任何的包装
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 重点看这里
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

```

`funcs.reduce((a, b) => (...args) => a(b(...args)))` 这句乍一看会一脸懵逼，让我们来梳理一下

```js
[mw_1, mw_2, mw_3].reduce((a, b) => (...args) => a(b(...args)))

// 第一次
// a=mw_1, b=mw_2
// _result = (...args) => mw_1(mw_2(...args))

// 第二次
// a = (...args) => mw_1(mw_2(...args)), b=m2_3
// _result = (...args) => a(b)
// _result = (...args) => mw_1(mw_2(mw_3(...args)))

// 返回
(...args) => mw_1(mw_2(mw_3(...args)))
```

有没有注意到，第一次的 `_result` 的参数，就是第二次中 `b(...args)` 的返回值即：`mw_3(...args)`







