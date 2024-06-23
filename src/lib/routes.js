
export const LOGIN = '/login';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/login',
    '/register',
    '/products',
    '/api/auth/callback/google',  //must add it or it will consider as private
    '/api/auth/callback/github',
]

export const PROTECTED_SUB_ROUTES = [
    '/checkout',
]