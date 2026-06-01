import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login')
    .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register')
    .then(m => m.Register)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/layout')
    .then(m => m.Layout),
    children: [
      {
        path: 'library',
        loadComponent: () => import('./features/library/library-list/library-list')
        .then(m => m.LibraryList)
      },
      {
        path: 'catalog',
        loadComponent: () => import('./features/catalog/games-list/games-list')
        .then(m => m.GamesList)
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found')
    .then(m => m.NotFound)
  },
];
