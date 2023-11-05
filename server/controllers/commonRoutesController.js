import { Item } from '../models/itemModel.js';

// *********get all listed items*********

export const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).send({
            success: true,
            itemsCount: items.length,
            items,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No items listed',
            success: false,
            error,
        });
    }
}
// *********search listed items*********

export const searchItems = async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const items = await Item.find({
            $or: [
                { item_name: { $regex: new RegExp(searchQuery, 'i') } },
                { brand: { $regex: new RegExp(searchQuery, 'i') } },
            ]
        });
        res.status(200).send({
            success: true,
            itemsCount: items.length,
            items,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No items found',
            success: false,
            error,
        });
    }
}

// *********get item by id*********

export const getItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        res.status(200).send({
            success: true,
            item,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Item not found',
            success: false,
            error,
        });
    }
}