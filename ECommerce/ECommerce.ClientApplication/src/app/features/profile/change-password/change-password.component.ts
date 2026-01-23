import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth-service.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  passObj = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) {}

  onChangePassword() {
    if (this.passObj.newPassword !== this.passObj.confirmPassword) {
      alert("Yeni şifreler uyuşmuyor!");
      return;
    }

    // Backend ChangePasswordDto bekliyor (UserId, CurrentPassword, NewPassword)
    // UserId'yi serviste token'dan okuyup ekleyebiliriz veya burada ekleriz.
    // Şimdilik servise paslıyoruz.
    this.authService.changePassword(this.passObj).subscribe({
      next: (res) => {
        if (res.success) {
          alert("Şifreniz başarıyla değiştirildi. Lütfen tekrar giriş yapın.");
          this.authService.logout();
        } else {
          alert(res.message);
        }
      }
    });
  }
}