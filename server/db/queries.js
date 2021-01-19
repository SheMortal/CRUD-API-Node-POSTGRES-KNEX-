// connected knex
const knex = require('./knex');

module.exports = {
    // get all stickers
    // select * from sticker
    getAll() {
        return knex('sticker')
    },
    // get sticker by id
    // select * where id=..
    getOne(id) {
        return knex('sticker').where('id', id).first();
    },
    create(sticker) {
        return knex('sticker').insert(sticker, '*');
    },
    update(id, sticker) {
        return knex('sticker').where('id', id).update(sticker, '*');
    },
    delete(id) {
        return knex('sticker').where('id', id).del();
    }
}