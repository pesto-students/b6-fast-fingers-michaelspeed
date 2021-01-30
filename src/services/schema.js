export const playerSchema = {
    title: 'player',
    description: 'This schema holds player information',
    version: 0,
    type: 'object',
    properties: {
        id: {
            type: 'string',
            primary: true
        },
        name: {
            type: 'string',
        }
    },
    indexes: [
        'name', 'id'
    ],
    required: ['name']
}

export const gameScoreSchema = {
    title: 'score',
    description: 'This schema holds score information',
    version: 0,
    type: 'object',
    properties: {
        id: {
            type: 'string',
            primary: true
        },
        name: {
            type: 'string'
        },
        scores: {
            type: 'integer'
        },
        createdAt: {
            type: 'integer'
        }
    },
    indexes: [
        'id', 'name'
    ],
    required: ['name']
}
