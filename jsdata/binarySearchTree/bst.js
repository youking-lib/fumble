function BST () {
    this.root = new Node()
}

function Node (value, left, right) {
    this.left = left
    this.right = right
    this.value = value
}

BST.prototype.insert = function(value){
    let parentNode = this.findParent(this.root, value)
    let newNode = new Node(value)
    const parentValue = parentNode.value

    if (parentValue === undefined) {
        parentNode.value = value
    } else if(parentValue > value) {
        parentNode.left = newNode
    } else if(parentValue < value) {
        parentNode.right = newNode
    }

    return newNode
}

BST.prototype.insertMany = function(array){
    array.forEach(item => this.insert(item))
}

BST.prototype.preOrder = function(root, cb){
    if (root !== undefined) {
        cb(root)
        this.preOrder(root.left, cb)
        this.preOrder(root.right, cb)
    }
}

BST.prototype.inOrder = function(root, cb) {
    if(root !== undefined) {
        this.inOrder(root.left, cb)
        cb(root)
        this.inOrder(root.right, cb)
    }
}

BST.prototype.postOrder = function(root, cb) {
    if(root !== undefined) {
        this.postOrder(root.left, cb)
        this.postOrder(root.right, cb)
        cb(root)
    }
}

BST.prototype.findParent = function(root, value) {
    let curNode = root
    let preNode = root

    if (curNode.value === undefined) {
        return curNode
    }

    while (curNode) {
        preNode = curNode

        if (curNode.value === value) {
            break;
        }

        curNode = value > curNode.value ? curNode.right : curNode.left
    }
    return preNode
}

module.exports = BST