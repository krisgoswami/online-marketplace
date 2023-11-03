import { Item } from '../models/itemModel.js';

// *********get all listed items*********

export const getItems = async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).send({
            success: true,
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