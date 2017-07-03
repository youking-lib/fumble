const { describe, it } = require('mocha')
const { expect } = require('chai')

const LinkList = require('./oneside-linkList')

describe('LinkList', () => {
    it('api should be availiable', () => {
        const instance = new LinkList()

        const node1 = instance.insert('node1', instance.header)
        const node2 = instance.insert('node2', node1)
        const node3 = instance.insert('node3', node2)

        expect(instance.toString()).to.equal('node1,node2,node3')

        instance.remove(node2)

        expect(instance.findPrevious(node3)).to.deep.equal(node1)
    })

    it('should be availiable when nodes are object', () => {
        const instance = new LinkList()

        const node1 = instance.insert({name: 'node1'}, instance.header)
        const node2 = instance.insert({name: 'node2'}, node1)
        const node3 = instance.insert({name: 'node3'}, node2)

        expect(instance._toArray()).to.deep.equal([{name: 'node1'}, {name: 'node2'}, {name: 'node3'}])
    })
})