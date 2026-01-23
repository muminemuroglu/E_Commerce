import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CartComponent } from './features/cart/cart.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Tarayıcıda localhost:4200 açıldığında Home yüklensin
    { path: 'home', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent }, // Dinamik ID ile rota
    {path:'login', component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'favorites',component: FavoritesComponent}, // Favoriler sayfası için rota
     { path: 'cart', component: CartComponent },
     { path: 'profile', component: ProfileComponent },
   
];

