'use strict';
require('babel-register')

const { createStore, combineReducers } = require('./src')

const reducer_a = (state, action) => {
    state = state || {a: '123'}
    return Object.assign({}, state, action)
}

const reducer_b = (state, action) => {
    state = state || {b: '456'}
    return Object.assign({}, state, action)
}

const reducers = combineReducers({reducer_a, reducer_b})
const store = createStore(reducers)
console.log('store', store)
store.dispatch({type: '456'})
console.log('store.getState()', store.getState())