function LinkList(){
    this.header = new Node('header')
}

function Node(value) {
    this.value = value
    this.next = null
}

LinkList.prototype.find = function(node){
    const query = typeof node === 'function' ? node : item => item === node
    let point = this.header

    while (point !== null && !query(point)) {
        point = point.next
    }

    return point
}

LinkList.prototype.findPrevious = function(node){
    const query = typeof node === 'function' ? node : item => item === node
    let point = this.header

    while (point.next !== null && !query(point.next)) {
        point = point.next
    }

    return point
}

LinkList.prototype.insert = function(newValue, targetNode){
    const newNodeInstance = new Node(newValue)
    const target = this.find(targetNode)
    newNodeInstance.next = target.next
    target.next = newNodeInstance

    return newNodeInstance
}

LinkList.prototype.remove = function(targetNode){
    const preNode = this.findPrevious(targetNode)
    preNode.next = targetNode.next
}

LinkList.prototype.toString = function(){
    return this._toArray().toString()
}

LinkList.prototype._toArray = function(){
    let curNode = this.header.next
    let store = []
    while (curNode !== null) {
        store.push(curNode.value)
        curNode = curNode.next
    }
    return store
}

module.exports = LinkList