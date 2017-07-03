const { describe, it } = require('mocha')
const { expect } = require('chai')

const Graph = require('./graph')

describe('Graph', () => {
    const vertices = ['home', 'school', 'hospital', 'park', 'shop', 'restaurant', 'office']
    const instance = new Graph(vertices)

    before(function() {
        instance.addEdges('home', 'shop')
        instance.addEdges('home', 'school')
        instance.addEdges('home', 'office')
        instance.addEdges('office', 'park')
        instance.addEdges('school', 'hospital')
        instance.addEdges('hospital', 'restaurant')
        instance.addEdges('shop', 'restaurant')
    })

    it('api should be availiable', () => {
        const expectNet = [
            { name: 'home', vertices: [4, 1, 6] },
            { name: 'school', vertices: [0, 2] },
            { name: 'hospital', vertices: [1, 5] },
            { name: 'park', vertices: [6] },
            { name: 'shop', vertices: [0, 5] },
            { name: 'restaurant', vertices: [2, 4] },
            { name: 'office', vertices: [0, 3] }
        ]

        expect(instance.vertices).to.deep.equal(vertices)
        expect(instance.net).to.deep.equal(expectNet)
        expect(instance.edges).to.equal(7)

        instance.addVertex('cinema')
        instance.addEdges('park', 'cinema')

        expectNet.push({name: 'cinema', vertices: [3]})
        expectNet[3].vertices.push(7)

        expect(instance.net).to.deep.equal(expectNet)
        expect(instance.edges).to.equal(8)
    })

    it('should correct when deep search first', () => {
        const expectRes = ['home', 'shop', 'restaurant', 'hospital', 'school', 'office', 'park', 'cinema']
        const res = []

        instance.dfs('home', function(item){
            res.push(item)
        })

        expect(res).to.deep.equal(expectRes)
    })

    it('should correct when broad search first', () => {
        const expectRes = ['home', 'shop', 'school', 'office', 'restaurant', 'hospital', 'park', 'hospital', 'cinema']
        const res = []

        instance.bfs('home', function(item) {
            res.push(item)
        })

        expect(res).to.deep.equal(expectRes)
    })

    it('should be availiable if given object', () => {
        const placeObj = [
            { name: 'home' }, 
            { name: 'school' }, 
            { name: 'hospital' }, 
            { name: 'park' }, 
            { name: 'shop' }, 
            { name: 'restaurant' }, 
            { name: 'office' }
        ]
        const graphObj = new Graph(placeObj)

        graphObj.addEdges(placeObj[0], placeObj[4])
        graphObj.addEdges(placeObj[0], placeObj[1])
        graphObj.addEdges(placeObj[0], placeObj[6])
        graphObj.addEdges(placeObj[6], placeObj[3])
        graphObj.addEdges(placeObj[1], placeObj[2])
        graphObj.addEdges(placeObj[2], placeObj[5])
        graphObj.addEdges(placeObj[4], placeObj[5])
        
        const expectNet = [
            { name: placeObj[0], vertices: [4, 1, 6] },
            { name: placeObj[1], vertices: [0, 2] },
            { name: placeObj[2], vertices: [1, 5] },
            { name: placeObj[3], vertices: [6] },
            { name: placeObj[4], vertices: [0, 5] },
            { name: placeObj[5], vertices: [2, 4] },
            { name: placeObj[6], vertices: [0, 3] }
        ]

        expect(graphObj.net).to.deep.equal(expectNet)
    })
})
