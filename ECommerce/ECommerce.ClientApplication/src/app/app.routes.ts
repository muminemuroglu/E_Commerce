import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // Tarayıcıda localhost:4200 açıldığında Home yüklensin
    { path: 'home', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent }, // Dinamik ID ile rota
    {path:'login', component: LoginComponent},
    {path:'register',component: RegisterComponent}
];

