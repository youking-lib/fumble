function Queue (queue) {
    if (queue && !assertType) {
        throw TypeError('argument queue should be an array or an Queue instance')
    }

    if (!(this instanceof Queue)) {
        throw TypeError('Queue constructor should be called width `new` keyword')
    }

    this.queue = Array.isArray(queue) ? queue : (queue instanceof Queue) ? queue.queue : []
}

Queue.prototype.enqueue = function(el){
    if (el instanceof Queue) {
        this.queue = this.queue.concat(el)
    } else {
        this.queue.push(el)
    }
}

Queue.prototype.dequeue = function(){
    return this.queue.shift()
}

Queue.prototype.length = function(){
    return this.queue.length
}

Queue.prototype.first = function(){
    return this.queue[0]
}

Queue.prototype.last = function(){
    return this.queue[this.queue.length - 1]
}

Queue.prototype.clear = function(){
    this.queue = []
}

Queue.prototype.toString = function(){
    return this.queue.toString()
}

function assertType(queue) {
    return !!queue && ((Object.prototype.toString.call(queue) === '[object Array]') || (queue instanceof Queue))
}

module.exports = Queue