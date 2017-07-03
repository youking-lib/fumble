const { describe, it } = require('mocha')
const { expect } = require('chai')

const Queue = require('./queue')

describe('Queue', () => {
    it('should be called width `new` keywrod', () => {
        expect(Queue).to.throw(TypeError)
    })

    it('should accept undefined an array or an instance of Queue', () => {
        const acceptArray = new Queue([{a: 1}, 2, 3])
        const acceptInstance = new Queue(acceptArray)
        const acceptEmpty = new Queue()

        expect(acceptArray.queue).to.deep.equal([{a: 1}, 2, 3])
        expect(acceptInstance.queue).to.deep.equal([{a: 1}, 2, 3])
        expect(acceptEmpty.queue).to.deep.equal([])
    })

    it('should be available', () => {
        const instance = new Queue()

        instance.enqueue('w')
        instance.enqueue('h')
        instance.enqueue('i')
        instance.enqueue('s')

        expect(instance.length()).to.equal(4)
        expect(instance.queue).to.deep.equal(['w', 'h', 'i', 's'])

        const de1 = instance.dequeue()
        const de2 = instance.dequeue()

        expect(de1).to.equal('w')
        expect(de2).to.equal('h')
        expect(instance.length()).to.equal(2)
    })
})