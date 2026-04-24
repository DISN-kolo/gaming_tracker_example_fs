import { Routes } from '@angular/router';

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
    path: 'library',
    canActivate: [authGuard],
    loadComponent: () => import('./features/library/library-list/library-list')
    .then(m => m.LibraryList)
  },
];
