import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { CartComponent } from './features/cart/cart.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrdersComponent } from './features/orders/orders.component';
import { OrderDetailComponent } from './features/order-detail/order-detail.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { ChangePasswordComponent } from './features/profile/change-password/change-password.component';
import { NotfoundComponent } from './features/error-page/notfound/notfound.component';
import { ServerErrorComponent } from './features/error-page/server-error/server-error.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', component: HomeComponent }, // Tarayıcıda localhost:4200 açıldığında Home yüklensin
    { path: 'home', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent }, // Dinamik ID ile rota
    {path:'login', component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'favorites',component: FavoritesComponent,canActivate: [authGuard]}, // Favoriler sayfası için rota
    { path: 'cart', component: CartComponent },
    { path: 'profile', component: ProfileComponent ,canActivate: [authGuard]},
    { path: 'checkout', component: CheckoutComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders/:id', component: OrderDetailComponent },
    {path:'products', component: ProductListComponent}, // Ürünler sayfası için rota
   { path: 'categories', component: CategoryListComponent }, // Kategoriler sayfası için rota
   { path: 'change-password', component: ChangePasswordComponent,canActivate: [authGuard] },
   { path: 'server-error', component: ServerErrorComponent }, //Server error sayfası için rota
   { path: '**', component: NotfoundComponent }// 404 sayfası için rota
  

];

