// This file is auto-generated by @hey-api/openapi-ts

export enum SaleType {
    GOLD = 'Gold',
    ACCOUNT = 'Account',
    SERVICE = 'Service'
}

export type CreateSaleInput = {
    itemType: SaleType;
    buyer: string;
    price: number;
};

export type User = {
    _id: string;
    name: string;
    hash: string;
};

export type Sale = {
    itemType: SaleType;
    id: string;
    buyer: string;
    date: string;
    price: number;
};

export type AuthInput = {
    username: string;
    password: string;
};

export type GetHelloResponse = (string);

export type GetHelloError = unknown;

export type CreateSaleData = {
    body: CreateSaleInput;
};

export type CreateSaleResponse = (unknown);

export type CreateSaleError = unknown;

export type GetUserData = {
    path: {
        username: string;
    };
};

export type GetUserResponse = (User);

export type GetUserError = unknown;

export type GetUserSalesData = {
    path: {
        user_id: string;
    };
};

export type GetUserSalesResponse = (Array<Sale>);

export type GetUserSalesError = unknown;

export type LoginData = {
    body: AuthInput;
};

export type LoginResponse = (unknown);

export type LoginError = unknown;

export type CreateUserData = {
    body: AuthInput;
};

export type CreateUserResponse = (unknown);

export type CreateUserError = unknown;