function Stack(){
    if (!(this instanceof Stack)) {
        throw new TypeError('Stack constructor and should be called with the `new` keyword')
    }
    this.dataStore = []
    this.top = 0
}

// 删除栈顶，并返回删除的元素
Stack.prototype.pop = function(index){
    return this.dataStore[--this.top]
}

Stack.prototype.push = function(el){
    return this.dataStore[this.top++] = el
}

// 返回栈顶元素
Stack.prototype.peek = function(){
    return this.dataStore[this.top - 1]
}

Stack.prototype.clear = function(){
    this.top = 0
    this.dataStore = []
}

Stack.prototype.length = function(){
    return this.top
}

Stack.prototype.toString = function(){
    return this.dataStore.toString()
}

Stack.prototype._getStore = function(){
    return this.dataStore
}

module.exports = Stack