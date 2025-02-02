// This file is auto-generated by @hey-api/openapi-ts

export const $SaleType = {
    type: 'string',
    enum: ['Gold', 'Account', 'Service']
} as const;

export const $CreateSaleInput = {
    type: 'object',
    properties: {
        itemType: {
            '$ref': '#/components/schemas/SaleType'
        },
        buyer: {
            type: 'string'
        },
        price: {
            type: 'number'
        }
    },
    required: ['itemType', 'buyer', 'price']
} as const;

export const $User = {
    type: 'object',
    properties: {
        _id: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        hash: {
            type: 'string'
        }
    },
    required: ['_id', 'name', 'email', 'hash']
} as const;

export const $Sale = {
    type: 'object',
    properties: {
        itemType: {
            '$ref': '#/components/schemas/SaleType'
        },
        id: {
            type: 'string'
        },
        buyer: {
            type: 'string'
        },
        date: {
            format: 'date-time',
            type: 'string'
        },
        price: {
            type: 'number'
        }
    },
    required: ['itemType', 'id', 'buyer', 'date', 'price']
} as const;

export const $LoginInput = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    },
    required: ['email', 'password']
} as const;

export const $RegisterInput = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 2,
            maxLength: 50
        },
        email: {
            type: 'string'
        },
        password: {
            type: 'string',
            minLength: 7
        }
    },
    required: ['username', 'email', 'password']
} as const;