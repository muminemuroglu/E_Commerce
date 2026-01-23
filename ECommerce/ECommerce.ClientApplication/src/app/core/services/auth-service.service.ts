import { Injectable, signal } from '@angular/core';
import { BaseService } from './baseService.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Kullanıcı giriş durumunu takip eden sinyal (Angular 17+)
  currentUser = signal<{ name: string, email: string } | null>(null);

  constructor(private baseService: BaseService, private router: Router) {
    // Sayfa yenilendiğinde localStorage'dan kontrol et
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(credentials: any) {
    // Burası normalde API'ye gider, şimdilik simüle ediyoruz
    // return this.baseService.post('Auth/Login', credentials)...
    
    // SİMÜLASYON (Gerçek API bağlanana kadar):
    const dummyUser = { name: 'Metehan Polat', email: credentials.email };
    localStorage.setItem('user', JSON.stringify(dummyUser));
    localStorage.setItem('token', 'fake-jwt-token'); // Token varmış gibi
    this.currentUser.set(dummyUser);
    return true; 
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }
}