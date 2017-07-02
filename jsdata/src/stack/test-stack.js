const { describe, it } = require('mocha')
const { expect } = require('chai')
const stackUtils = require('./utils')
const Stack = require('./stack')

describe('Stack', function () {
    
    it('should be called width `new` keywords', () => {
        let instance = new Stack()

        expect(instance).to.be.an.instanceof(Stack)
        expect(Stack).to.throw(TypeError)
    })

    it('should be change length to X if push X times', () => {
        let instance = new Stack()
        instance.push('w')
        instance.push('h')
        instance.push('i')

        const l1 = instance.length()
        instance.push('i')
        const l2 = instance.length()

        expect(l1).to.equal(3)
        expect(l2).to.equal(4)
    })

    it('should return top of stack', () => {
        let instance = new Stack()
        instance.push('w')
        instance.push('h')
        instance.push('i')

        expect(instance.peek()).to.equal('i')
    })

    it('should be [] when clear', () => {
        let instance = new Stack()
        instance.push('w')
        instance.push('h')
        instance.push('i')
        instance.clear()
        expect(instance.length()).to.equal(0)
    })

    it('should return some one popped', () => {
        let instance = new Stack()
        instance.push('w')
        instance.push('h')
        instance.push('i')

        expect(instance.pop()).to.equal('i')
    })

    // Practises width Stack
    describe('Stack utils:mulBase', function(){
        it('should convert 10 to 1010 binary', () => {
            const res = stackUtils.mulBase(10, 2)
            expect(res).to.equal(1010)
        })
    })

    describe('Stack utils:isPalindrome', function(){
        it('should be true if it is a palind', () => {
            const toBeFalse = stackUtils.isPalindrome('hello')
            const toBeTrue = stackUtils.isPalindrome('racecar')

            expect(toBeFalse).to.be.false
            expect(toBeTrue).to.be.true
        })
    })

    describe('Stack utils:factorial', function(){
        it('should throw error if you do not give a whole number', () => {
            function testNum(){
                stackUtils.factorial(10.1)
            }
            expect(testNum).to.throw(TypeError)
        })

        it('should be 24 if give 4 to it', () => {
            expect(stackUtils.factorial(4)).to.equal(24)
        })
    })
})

