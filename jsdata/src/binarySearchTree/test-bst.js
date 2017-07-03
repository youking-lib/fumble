const { describe, it } = require('mocha')
const { expect } = require('chai')

const BST = require('./bst')

describe('BST', () => {
    it('api should be availiable', () => {
        const bst = new BST() 
        
        bst.insertMany([20, 30, 10, 12, 13, 9, 33, 39, 24, 25])

        let preList = []
        let inList = []
        let postList = []

        bst.preOrder(bst.root, node => preList.push(node.value))
        bst.inOrder(bst.root, node => inList.push(node.value))
        bst.postOrder(bst.root, node => postList.push(node.value))

        expect(preList).to.deep.equal([20, 10, 9, 12, 13, 30, 24, 25, 33, 39])
        expect(inList).to.deep.equal([9, 10, 12, 13, 20, 24, 25, 30, 33, 39])
        expect(postList).to.deep.equal([9, 13, 12, 10, 25, 24, 39, 33, 30, 20])
    })
})