import {addRxPlugin, createRxDatabase} from "rxdb";
import {gameScoreSchema, playerSchema} from "./schema";
import moment from 'moment';
import { nanoid } from 'nanoid'

const collections = [
    {
        name: 'players',
        schema: playerSchema,
        statics: {
            whoAmI: function () {
                return this.name;
            }
        },
        methods: {

        }
    },
    {
        name: 'games',
        schema: gameScoreSchema,
        statics: {

        },
        methods: {

        }
    }
]

let db

addRxPlugin(require('pouchdb-adapter-idb'));

export const _loadDb = async () => {
    const dbPromise = await createRxDatabase({
        name: 'fastfingers',
        adapter: 'idb',
    })
    await Promise.all(collections.map(colData => dbPromise.collection(colData)))
    dbPromise.collections.games.preSave((plainData, rxDoc) => {
        plainData.createdAt = moment().unix();
        plainData.id = nanoid()
    })
    dbPromise.collections.players.preSave((plainData, rxDoc) => {
        plainData.id = nanoid();
    })
    return dbPromise
}

export const getDb = () => {
    if (!db) {
        db = _loadDb()
    }
    return db;
}
