const Stack = require('./stack')

// 2-8-10进制转换
exports.mulBase = function(num, _base){
    const stack = new Stack()
    const base = _base || 10

    while ((num / base) > 0) {
        stack.push(num % base)
        num = Math.floor(num / base)
    }
    return Number(stack._getStore().reverse().join(''))
}

// 判断回文
exports.isPalindrome = function(word) {
    const stack = new Stack()

    for(let i = 0; i<word.length; i++) {
        stack.push(word[i])
    }
    let rword = ''
    while(stack.length() > 0) {
        rword += stack.pop()
    }
    return rword === word
}

// 求阶乘
exports.factorial = function(_n) {
    const stack = new Stack()
    let n = parseInt(_n, 10)

    if (n != _n) {
        throw TypeError('n should be a whole number')
    }

    while(n > 1) {
        stack.push(n--)
    }

    let res = 1
    while (stack.length() > 0) {
        res *= stack.pop()
    }

    return res
}