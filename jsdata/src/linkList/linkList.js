function LinkList(){
    this.header = new Node(null, 'header', null)
    this.pointer = this.header
}

function Node (before, value, after) {
    this.before = before
    this.value = value
    this.after = after
}

LinkList.prototype.find = function(target){
    const query = typeof target === 'function' ? target : item => item === target
    let curNode = this.header

    while (curNode !== null && !query(curNode)) {
        curNode = curNode.after
    }

    return curNode
}

LinkList.prototype.insert = function(value, target) {
    const targetNode = this.find(target)
    const newNode = new Node(targetNode, value, targetNode.after)

    if (targetNode.after) {
        targetNode.after.before = newNode
    }
    
    targetNode.after = newNode
    return newNode
}

LinkList.prototype.remove = function(target) {
    let targetNode = this.find(target)
    targetNode.before.after = target.after

    if (this.pointer === targetNode) {
        this.next()
    }

    if (target.after !== null) { 
        target.after.before = target.before
    }
    targetNode = null
}

LinkList.prototype.next = function(){
    this.pointer = this.pointer.after
}

LinkList.prototype.pre = function(){
    this.pointer = this.pointer.before
}

LinkList.prototype.toString = function(){
    return this._toArray().toString()
}

LinkList.prototype._toArray = function(){
    let curNode = this.header.after
    let arr = []

    while(curNode !== null) {
        arr.push(curNode.value)
        curNode = curNode.after
    }

    return arr
}

module.exports = LinkList