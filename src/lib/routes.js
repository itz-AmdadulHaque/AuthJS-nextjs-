
export const LOGIN = '/login';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/login',
    '/register',
    '/products',
    '/unauthorize',
    '/api',
    '/api/auth/callback/google',  //must add it or it will consider as private
    '/api/auth/callback/github',
]

export const ADMIN_ROUTES = [
    '/dashboard'
]

export const PROTECTED_SUB_ROUTES = [
    '/checkout',
]