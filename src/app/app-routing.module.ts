import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CanActivate, Router } from '@angular/router';
import { GuardService } from './sdk/custom/guard.service';
const routes: Routes = [
  {  path: '',
     redirectTo: 'movies',
     pathMatch: 'full'
  },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'moviedetails',
    loadChildren: () => import('./moviedetails/moviedetails.module').then( m => m.MoviedetailsPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule),
    canActivate: [GuardService]
  },
  { path: 'movies/:id',
    loadChildren: './moviedetails/moviedetails.module#MoviedetailsPageModule'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [GuardService]
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
