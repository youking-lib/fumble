function Graph (v) {
    this.vertices = v
    this.edges = 0
    this.net = []
    this.marked = {}

    this._init()
}

Graph.prototype._init = function(){
    for (var i=0, len=this.vertices.length; i<len; i++) {
        this.net[i] = {
            name: this.vertices[i],
            vertices: []
        }
    }
}

Graph.prototype.addEdges = function(v, w){
    var vIndex = this.vertices.indexOf(v)
    var wIndex = this.vertices.indexOf(w)

    if ((vIndex === -1) || (wIndex === -1)) {
        return false
    }
    
    var _vIndex = this.net[vIndex].vertices.indexOf(w)
    var _wIndex = this.net[wIndex].vertices.indexOf(v)

    if ((_vIndex === -1) && (_wIndex === -1)) {
        this.net[vIndex].vertices.push(wIndex)
        this.net[wIndex].vertices.push(vIndex)
        this.edges++
    }
}

Graph.prototype.addVertex = function(v) {
    this.vertices.push(v)
    this.net.push({
        name: v,
        vertices: []
    })
}

// deep first search
Graph.prototype.dfs = function(v, cb) {
    this.marked = {}

    var index = this.vertices.indexOf(v)

    if (index !== -1) {
        this._deepFirstSearch(index, cb)
    }
}

Graph.prototype.bfs = function(v, cb) {
    this.marked = {}
    
    var index = this.vertices.indexOf(v)

    if (index === -1) {
        return
    }

    var queue = [index]

    while (queue.length !== 0) {
        var vertexIndex = queue.shift()
        var linkedVertices = this.net[vertexIndex].vertices

        this.marked[vertexIndex] = true
        cb(this.vertices[vertexIndex], vertexIndex, this.vertices)

        for (var i=0, len=linkedVertices.length; i<len; i++) {
            if (!this.marked[linkedVertices[i]]) {
                queue.push(linkedVertices[i])
            }
        }
    }

}

Graph.prototype._deepFirstSearch = function(vertexIndex, cb){
    var linkedVertices = this.net[vertexIndex].vertices

    this.marked[vertexIndex] = true
    cb(this.vertices[vertexIndex], vertexIndex, this.vertices)
    
    for (var i=0, len=linkedVertices.length; i<len; i++) {
        var linkedVertexIndex = linkedVertices[i]
        if (this.marked[linkedVertexIndex] !== true) {
            this._deepFirstSearch(linkedVertexIndex, cb)
        }
    }
}

module.exports = Graph