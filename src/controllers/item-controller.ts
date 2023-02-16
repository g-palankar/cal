import { NextFunction, Router, Response, Request } from "express";
import { ItemDatabase } from "../database/item/items-database";
import { HttpError } from "../models/errors/htttp-error";
import { StandardResponse } from "../models/standard-response"
import { Item, NewItem } from "../models/item/item";
import { validateNewItem } from "models/item/item-schema";
import { HttpErrors } from "models/errors/not-found-error";

export class ItemController {
    private _router = Router()

    constructor(private itemDatabase: ItemDatabase) {
        this.setupRoutes()
    }

    setupRoutes() {
        this._router.post('/', this.createItem)
    }

    getRouter() {
        return this._router
    }

    createItem = async (req: Request, res: Response, next: NextFunction) => {
        const error = await validateNewItem(req.body)
        if (error) return next(new HttpError("Invalid Item", 400, error))

        const newItem = {
            ...req.body as NewItem,
            userId: req.user.id
        }

        try {
            const item = await this.itemDatabase.createItem(newItem) as Item
            const resp: StandardResponse<Item> = {
                data: item,
                message: 'Item created successfully',
                code: 200
            }
            return res.send(resp)
        } catch (error) {
            next(HttpErrors.internalServer())
        }

    }

}