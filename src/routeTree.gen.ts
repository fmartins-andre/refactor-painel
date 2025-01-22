/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedRoutesRouteImport } from './routes/_authenticated-routes/route'
import { Route as AuthenticatedRoutesIndexImport } from './routes/_authenticated-routes/index'
import { Route as PublicRoutesReportsImport } from './routes/_public-routes/reports'
import { Route as PublicRoutesAutenticacaoRouteImport } from './routes/_public-routes/_autenticacao/route'
import { Route as AuthenticatedRoutesNotasAvulsasIndexImport } from './routes/_authenticated-routes/notas-avulsas/index'
import { Route as AuthenticatedRoutesDashboardIndexImport } from './routes/_authenticated-routes/dashboard/index'
import { Route as AuthenticatedRoutesClientesIndexImport } from './routes/_authenticated-routes/clientes/index'
import { Route as AuthenticatedRoutesCertificadoIndexImport } from './routes/_authenticated-routes/certificado/index'
import { Route as PublicRoutesAutenticacaoRecuperarSenhaImport } from './routes/_public-routes/_autenticacao/recuperar-senha'
import { Route as PublicRoutesAutenticacaoLogoutImport } from './routes/_public-routes/_autenticacao/logout'
import { Route as PublicRoutesAutenticacaoLoginImport } from './routes/_public-routes/_autenticacao/login'

// Create/Update Routes

const AuthenticatedRoutesRouteRoute = AuthenticatedRoutesRouteImport.update({
  id: '/_authenticated-routes',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoutesIndexRoute = AuthenticatedRoutesIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoutesRouteRoute,
} as any)

const PublicRoutesReportsRoute = PublicRoutesReportsImport.update({
  id: '/_public-routes/reports',
  path: '/reports',
  getParentRoute: () => rootRoute,
} as any)

const PublicRoutesAutenticacaoRouteRoute =
  PublicRoutesAutenticacaoRouteImport.update({
    id: '/_public-routes/_autenticacao',
    getParentRoute: () => rootRoute,
  } as any)

const AuthenticatedRoutesNotasAvulsasIndexRoute =
  AuthenticatedRoutesNotasAvulsasIndexImport.update({
    id: '/notas-avulsas/',
    path: '/notas-avulsas/',
    getParentRoute: () => AuthenticatedRoutesRouteRoute,
  } as any)

const AuthenticatedRoutesDashboardIndexRoute =
  AuthenticatedRoutesDashboardIndexImport.update({
    id: '/dashboard/',
    path: '/dashboard/',
    getParentRoute: () => AuthenticatedRoutesRouteRoute,
  } as any)

const AuthenticatedRoutesClientesIndexRoute =
  AuthenticatedRoutesClientesIndexImport.update({
    id: '/clientes/',
    path: '/clientes/',
    getParentRoute: () => AuthenticatedRoutesRouteRoute,
  } as any)

const AuthenticatedRoutesCertificadoIndexRoute =
  AuthenticatedRoutesCertificadoIndexImport.update({
    id: '/certificado/',
    path: '/certificado/',
    getParentRoute: () => AuthenticatedRoutesRouteRoute,
  } as any)

const PublicRoutesAutenticacaoRecuperarSenhaRoute =
  PublicRoutesAutenticacaoRecuperarSenhaImport.update({
    id: '/recuperar-senha',
    path: '/recuperar-senha',
    getParentRoute: () => PublicRoutesAutenticacaoRouteRoute,
  } as any)

const PublicRoutesAutenticacaoLogoutRoute =
  PublicRoutesAutenticacaoLogoutImport.update({
    id: '/logout',
    path: '/logout',
    getParentRoute: () => PublicRoutesAutenticacaoRouteRoute,
  } as any)

const PublicRoutesAutenticacaoLoginRoute =
  PublicRoutesAutenticacaoLoginImport.update({
    id: '/login',
    path: '/login',
    getParentRoute: () => PublicRoutesAutenticacaoRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated-routes': {
      id: '/_authenticated-routes'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRoutesRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public-routes/_autenticacao': {
      id: '/_public-routes/_autenticacao'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicRoutesAutenticacaoRouteImport
      parentRoute: typeof rootRoute
    }
    '/_public-routes/reports': {
      id: '/_public-routes/reports'
      path: '/reports'
      fullPath: '/reports'
      preLoaderRoute: typeof PublicRoutesReportsImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated-routes/': {
      id: '/_authenticated-routes/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedRoutesIndexImport
      parentRoute: typeof AuthenticatedRoutesRouteImport
    }
    '/_public-routes/_autenticacao/login': {
      id: '/_public-routes/_autenticacao/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicRoutesAutenticacaoLoginImport
      parentRoute: typeof PublicRoutesAutenticacaoRouteImport
    }
    '/_public-routes/_autenticacao/logout': {
      id: '/_public-routes/_autenticacao/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof PublicRoutesAutenticacaoLogoutImport
      parentRoute: typeof PublicRoutesAutenticacaoRouteImport
    }
    '/_public-routes/_autenticacao/recuperar-senha': {
      id: '/_public-routes/_autenticacao/recuperar-senha'
      path: '/recuperar-senha'
      fullPath: '/recuperar-senha'
      preLoaderRoute: typeof PublicRoutesAutenticacaoRecuperarSenhaImport
      parentRoute: typeof PublicRoutesAutenticacaoRouteImport
    }
    '/_authenticated-routes/certificado/': {
      id: '/_authenticated-routes/certificado/'
      path: '/certificado'
      fullPath: '/certificado'
      preLoaderRoute: typeof AuthenticatedRoutesCertificadoIndexImport
      parentRoute: typeof AuthenticatedRoutesRouteImport
    }
    '/_authenticated-routes/clientes/': {
      id: '/_authenticated-routes/clientes/'
      path: '/clientes'
      fullPath: '/clientes'
      preLoaderRoute: typeof AuthenticatedRoutesClientesIndexImport
      parentRoute: typeof AuthenticatedRoutesRouteImport
    }
    '/_authenticated-routes/dashboard/': {
      id: '/_authenticated-routes/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedRoutesDashboardIndexImport
      parentRoute: typeof AuthenticatedRoutesRouteImport
    }
    '/_authenticated-routes/notas-avulsas/': {
      id: '/_authenticated-routes/notas-avulsas/'
      path: '/notas-avulsas'
      fullPath: '/notas-avulsas'
      preLoaderRoute: typeof AuthenticatedRoutesNotasAvulsasIndexImport
      parentRoute: typeof AuthenticatedRoutesRouteImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRoutesRouteRouteChildren {
  AuthenticatedRoutesIndexRoute: typeof AuthenticatedRoutesIndexRoute
  AuthenticatedRoutesCertificadoIndexRoute: typeof AuthenticatedRoutesCertificadoIndexRoute
  AuthenticatedRoutesClientesIndexRoute: typeof AuthenticatedRoutesClientesIndexRoute
  AuthenticatedRoutesDashboardIndexRoute: typeof AuthenticatedRoutesDashboardIndexRoute
  AuthenticatedRoutesNotasAvulsasIndexRoute: typeof AuthenticatedRoutesNotasAvulsasIndexRoute
}

const AuthenticatedRoutesRouteRouteChildren: AuthenticatedRoutesRouteRouteChildren =
  {
    AuthenticatedRoutesIndexRoute: AuthenticatedRoutesIndexRoute,
    AuthenticatedRoutesCertificadoIndexRoute:
      AuthenticatedRoutesCertificadoIndexRoute,
    AuthenticatedRoutesClientesIndexRoute:
      AuthenticatedRoutesClientesIndexRoute,
    AuthenticatedRoutesDashboardIndexRoute:
      AuthenticatedRoutesDashboardIndexRoute,
    AuthenticatedRoutesNotasAvulsasIndexRoute:
      AuthenticatedRoutesNotasAvulsasIndexRoute,
  }

const AuthenticatedRoutesRouteRouteWithChildren =
  AuthenticatedRoutesRouteRoute._addFileChildren(
    AuthenticatedRoutesRouteRouteChildren,
  )

interface PublicRoutesAutenticacaoRouteRouteChildren {
  PublicRoutesAutenticacaoLoginRoute: typeof PublicRoutesAutenticacaoLoginRoute
  PublicRoutesAutenticacaoLogoutRoute: typeof PublicRoutesAutenticacaoLogoutRoute
  PublicRoutesAutenticacaoRecuperarSenhaRoute: typeof PublicRoutesAutenticacaoRecuperarSenhaRoute
}

const PublicRoutesAutenticacaoRouteRouteChildren: PublicRoutesAutenticacaoRouteRouteChildren =
  {
    PublicRoutesAutenticacaoLoginRoute: PublicRoutesAutenticacaoLoginRoute,
    PublicRoutesAutenticacaoLogoutRoute: PublicRoutesAutenticacaoLogoutRoute,
    PublicRoutesAutenticacaoRecuperarSenhaRoute:
      PublicRoutesAutenticacaoRecuperarSenhaRoute,
  }

const PublicRoutesAutenticacaoRouteRouteWithChildren =
  PublicRoutesAutenticacaoRouteRoute._addFileChildren(
    PublicRoutesAutenticacaoRouteRouteChildren,
  )

export interface FileRoutesByFullPath {
  '': typeof PublicRoutesAutenticacaoRouteRouteWithChildren
  '/reports': typeof PublicRoutesReportsRoute
  '/': typeof AuthenticatedRoutesIndexRoute
  '/login': typeof PublicRoutesAutenticacaoLoginRoute
  '/logout': typeof PublicRoutesAutenticacaoLogoutRoute
  '/recuperar-senha': typeof PublicRoutesAutenticacaoRecuperarSenhaRoute
  '/certificado': typeof AuthenticatedRoutesCertificadoIndexRoute
  '/clientes': typeof AuthenticatedRoutesClientesIndexRoute
  '/dashboard': typeof AuthenticatedRoutesDashboardIndexRoute
  '/notas-avulsas': typeof AuthenticatedRoutesNotasAvulsasIndexRoute
}

export interface FileRoutesByTo {
  '': typeof PublicRoutesAutenticacaoRouteRouteWithChildren
  '/reports': typeof PublicRoutesReportsRoute
  '/': typeof AuthenticatedRoutesIndexRoute
  '/login': typeof PublicRoutesAutenticacaoLoginRoute
  '/logout': typeof PublicRoutesAutenticacaoLogoutRoute
  '/recuperar-senha': typeof PublicRoutesAutenticacaoRecuperarSenhaRoute
  '/certificado': typeof AuthenticatedRoutesCertificadoIndexRoute
  '/clientes': typeof AuthenticatedRoutesClientesIndexRoute
  '/dashboard': typeof AuthenticatedRoutesDashboardIndexRoute
  '/notas-avulsas': typeof AuthenticatedRoutesNotasAvulsasIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated-routes': typeof AuthenticatedRoutesRouteRouteWithChildren
  '/_public-routes/_autenticacao': typeof PublicRoutesAutenticacaoRouteRouteWithChildren
  '/_public-routes/reports': typeof PublicRoutesReportsRoute
  '/_authenticated-routes/': typeof AuthenticatedRoutesIndexRoute
  '/_public-routes/_autenticacao/login': typeof PublicRoutesAutenticacaoLoginRoute
  '/_public-routes/_autenticacao/logout': typeof PublicRoutesAutenticacaoLogoutRoute
  '/_public-routes/_autenticacao/recuperar-senha': typeof PublicRoutesAutenticacaoRecuperarSenhaRoute
  '/_authenticated-routes/certificado/': typeof AuthenticatedRoutesCertificadoIndexRoute
  '/_authenticated-routes/clientes/': typeof AuthenticatedRoutesClientesIndexRoute
  '/_authenticated-routes/dashboard/': typeof AuthenticatedRoutesDashboardIndexRoute
  '/_authenticated-routes/notas-avulsas/': typeof AuthenticatedRoutesNotasAvulsasIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/reports'
    | '/'
    | '/login'
    | '/logout'
    | '/recuperar-senha'
    | '/certificado'
    | '/clientes'
    | '/dashboard'
    | '/notas-avulsas'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/reports'
    | '/'
    | '/login'
    | '/logout'
    | '/recuperar-senha'
    | '/certificado'
    | '/clientes'
    | '/dashboard'
    | '/notas-avulsas'
  id:
    | '__root__'
    | '/_authenticated-routes'
    | '/_public-routes/_autenticacao'
    | '/_public-routes/reports'
    | '/_authenticated-routes/'
    | '/_public-routes/_autenticacao/login'
    | '/_public-routes/_autenticacao/logout'
    | '/_public-routes/_autenticacao/recuperar-senha'
    | '/_authenticated-routes/certificado/'
    | '/_authenticated-routes/clientes/'
    | '/_authenticated-routes/dashboard/'
    | '/_authenticated-routes/notas-avulsas/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoutesRouteRoute: typeof AuthenticatedRoutesRouteRouteWithChildren
  PublicRoutesAutenticacaoRouteRoute: typeof PublicRoutesAutenticacaoRouteRouteWithChildren
  PublicRoutesReportsRoute: typeof PublicRoutesReportsRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoutesRouteRoute: AuthenticatedRoutesRouteRouteWithChildren,
  PublicRoutesAutenticacaoRouteRoute:
    PublicRoutesAutenticacaoRouteRouteWithChildren,
  PublicRoutesReportsRoute: PublicRoutesReportsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated-routes",
        "/_public-routes/_autenticacao",
        "/_public-routes/reports"
      ]
    },
    "/_authenticated-routes": {
      "filePath": "_authenticated-routes/route.tsx",
      "children": [
        "/_authenticated-routes/",
        "/_authenticated-routes/certificado/",
        "/_authenticated-routes/clientes/",
        "/_authenticated-routes/dashboard/",
        "/_authenticated-routes/notas-avulsas/"
      ]
    },
    "/_public-routes/_autenticacao": {
      "filePath": "_public-routes/_autenticacao/route.tsx",
      "children": [
        "/_public-routes/_autenticacao/login",
        "/_public-routes/_autenticacao/logout",
        "/_public-routes/_autenticacao/recuperar-senha"
      ]
    },
    "/_public-routes/reports": {
      "filePath": "_public-routes/reports.tsx"
    },
    "/_authenticated-routes/": {
      "filePath": "_authenticated-routes/index.tsx",
      "parent": "/_authenticated-routes"
    },
    "/_public-routes/_autenticacao/login": {
      "filePath": "_public-routes/_autenticacao/login.tsx",
      "parent": "/_public-routes/_autenticacao"
    },
    "/_public-routes/_autenticacao/logout": {
      "filePath": "_public-routes/_autenticacao/logout.tsx",
      "parent": "/_public-routes/_autenticacao"
    },
    "/_public-routes/_autenticacao/recuperar-senha": {
      "filePath": "_public-routes/_autenticacao/recuperar-senha.tsx",
      "parent": "/_public-routes/_autenticacao"
    },
    "/_authenticated-routes/certificado/": {
      "filePath": "_authenticated-routes/certificado/index.tsx",
      "parent": "/_authenticated-routes"
    },
    "/_authenticated-routes/clientes/": {
      "filePath": "_authenticated-routes/clientes/index.tsx",
      "parent": "/_authenticated-routes"
    },
    "/_authenticated-routes/dashboard/": {
      "filePath": "_authenticated-routes/dashboard/index.tsx",
      "parent": "/_authenticated-routes"
    },
    "/_authenticated-routes/notas-avulsas/": {
      "filePath": "_authenticated-routes/notas-avulsas/index.tsx",
      "parent": "/_authenticated-routes"
    }
  }
}
ROUTE_MANIFEST_END */
