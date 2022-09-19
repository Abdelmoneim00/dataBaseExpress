import express, {Request, Response} from 'express'
import { product, Store } from '../models/products'

const store = new Store

const index = async (_req : Request, res : Response) => {
    const returnP = await store.index()
    res.json(returnP)
}

const show = async (req : Request, res : Response) => {
    let id : String = req.params.id
    try {
        const returnP = await store.show(+id as Number)
        res.json(returnP)
    } catch(err : unknown) {
        throw new Error(`can not get the item, maybe try creating it first? ${err}`)
    }
}

const create = async (req : Request, res : Response) => {
    let name : String = req.params.name
    let price : String = req.params.price
    let Id : String = req.params.id
    try {
        const returnP = await store.create({
            id: +Id,
            name : name,
            price : +price
        })
        res.json(returnP)
    } catch(err : unknown) {
        throw new Error(`can not get the item, maybe try creating it first? ${err}`)
    }
}

const routeP =  (app : express.Application) => {
    app.get('/products', index)
    app.get('products/show', show)
}