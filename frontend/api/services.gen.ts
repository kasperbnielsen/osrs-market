// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-axios';
import type { GetHelloError, GetHelloResponse, CreateSaleData, CreateSaleError, CreateSaleResponse, GetUserData, GetUserError, GetUserResponse, GetUserSalesData, GetUserSalesError, GetUserSalesResponse, LoginData, LoginError, LoginResponse, CreateUserData, CreateUserError, CreateUserResponse } from './types.gen';

export const client = createClient(createConfig());

export const getHello = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<GetHelloResponse, GetHelloError, ThrowOnError>({
    ...options,
    url: '/'
}); };

export const createSale = <ThrowOnError extends boolean = false>(options: Options<CreateSaleData, ThrowOnError>) => { return (options?.client ?? client).post<CreateSaleResponse, CreateSaleError, ThrowOnError>({
    ...options,
    url: '/sales'
}); };

export const getUser = <ThrowOnError extends boolean = false>(options: Options<GetUserData, ThrowOnError>) => { return (options?.client ?? client).get<GetUserResponse, GetUserError, ThrowOnError>({
    ...options,
    url: '/users/{username}'
}); };

export const getUserSales = <ThrowOnError extends boolean = false>(options: Options<GetUserSalesData, ThrowOnError>) => { return (options?.client ?? client).get<GetUserSalesResponse, GetUserSalesError, ThrowOnError>({
    ...options,
    url: '/users/{user_id}/sales'
}); };

export const login = <ThrowOnError extends boolean = false>(options: Options<LoginData, ThrowOnError>) => { return (options?.client ?? client).post<LoginResponse, LoginError, ThrowOnError>({
    ...options,
    url: '/auth'
}); };

export const createUser = <ThrowOnError extends boolean = false>(options: Options<CreateUserData, ThrowOnError>) => { return (options?.client ?? client).post<CreateUserResponse, CreateUserError, ThrowOnError>({
    ...options,
    url: '/auth/register'
}); };