const { describe, it } = require('mocha')
const { expect } = require('chai')

const LinkList = require('./linkList')

describe('Tow side linkList', () => {
    it('api should be available', () => {
        const instance = new LinkList()

        const node1 = instance.insert('node1', instance.header)
        const node2 = instance.insert('node2', node1)
        const node3 = instance.insert('node3', node2)

        instance.next()
        instance.next()

        expect(instance.toString()).to.equal('node1,node2,node3')
        expect(instance.pointer).to.deep.equal(node2)

        instance.remove(node2)

        expect(instance._toArray()).to.deep.equal(['node1', 'node3'])
        expect(instance.pointer).to.deep.equal(node3)
    })

    it('should be available if nodes are object', () => {
        const instance = new LinkList()

        const node1 = instance.insert({name: 'node1'}, instance.header)
        const node3 = instance.insert({name: 'node3'}, node1)
        const node2 = instance.insert({name: 'node2'}, node1)

        instance.next()
        instance.next()

        expect(instance._toArray()).to.deep.equal([{name: 'node1'}, {name: 'node2'}, {name: 'node3'}])
        expect(instance.pointer).to.deep.equal(node2)
        expect(instance.find(findNode2)).to.deep.equal(node2)
        
        function findNode2 (node) {
            return node.value.name === 'node2'
        }
    })
})