import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'currency',
    loadChildren: () => import('./pages/currency/currency.module').then( m => m.CurrencyPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'climate',
    loadChildren: () => import('./pages/climate/climate.module').then( m => m.ClimatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./pages/shopping-list/shopping-list.module').then( m => m.ShoppingListPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
