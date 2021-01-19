const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

// check validation of sticker ID
function isValidID(req, res, next) {
    // if valid go to the next one
    if (!isNaN(req.params.id)) return next();
    // else.. 
    next(new Error('invalid ID'));
}

function validSticker(sticker) {
    const hasTitle = typeof sticker.title == 'string' && sticker.title.trim() != '';
    const hasURL = typeof sticker.url == 'string' && sticker.url.trim() != '';
    const hasDescription = typeof sticker.description == 'string' && sticker.description.trim() != '';
    const hasRating = !isNaN(sticker.rating);
    return hasTitle && hasDescription && hasURL && hasRating;
}

// get all stickers
router.get('/', (req, res) => {
    queries.getAll().then(stickers => {
        res.json(stickers)
    })
});

// get sticker by id
router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(sticker => {
        if (sticker) {
            res.json(sticker);
        } else {
            res.status(404);
            next();
        }
    })
});

// create a sticker
router.post('/', (req, res, next) => {
    if (validSticker(req.body)) {
        queries.create(req.body).then(stickers => {
            res.json(stickers[0]);
        });
    } else {
        next(new Error('Invalid sticker'));
    }
});

// update  sticker
router.put('/:id', isValidID, (req, res, next) => {
    if (validSticker(req.body)) {
        queries.update(req.params.id, req.body).then(stickers => {
            res.json(stickers[0]);
        });
    } else {
        next(new Error('Invalid sticker'));
    }
});

// delete sticker
router.delete('/:id', isValidID, (req, res) => {
    queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true
        });
    });
});

module.exports = router;