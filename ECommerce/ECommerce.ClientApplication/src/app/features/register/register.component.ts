import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-service.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerObj = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.registerObj.firstName && this.registerObj.email && this.registerObj.password) {
      this.authService.register(this.registerObj).subscribe({
        next: (res) => {
          if (res.success) {
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            this.router.navigate(['/login']);
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.error("Kayıt hatası:", err);
          alert("Bir hata oluştu.");
        }
      });
    }
  }
}