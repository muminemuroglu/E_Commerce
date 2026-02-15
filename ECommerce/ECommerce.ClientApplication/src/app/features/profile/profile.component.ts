import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../core/services/customer-service.service';
import { AuthService } from '../../core/services/auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // DTO ile uyumlu model
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    birthDate: '',
    gender: '',
    marketingConsent: false,
  };

  constructor(
    public authService: AuthService,
    private customerService: CustomerService,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.customerService.getProfile().subscribe({
      next: (data) => {
        if (data) {
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.email = data.email;
          this.user.phone = data.phone || '';
          this.user.address = data.address || '';
          this.user.city = data.city || '';
        }
      },
      error: (err) => console.error('Profil yüklenemedi', err),
    });
  }

  onSave() {
    const updateDto = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone || '',
      address: this.user.address || '',
      city: this.user.city || 'Belirtilmemiş', //
    };
    console.log('Gönderilen DTO:', updateDto); //
    this.customerService.updateProfile(updateDto).subscribe({
      next: (res) => {
        if (res.success) {
          alert('Bilgileriniz başarıyla güncellendi!');
        } else {
          alert(res?.message || 'İşlem başarısız.');
        }
      },
      error: (err) => {
        console.error(err);
        // Hatanın detayını görmek için:
        if (err.error && err.error.errors) {
          // Backend validasyon hatalarını (Hangi alan eksik?) alert ile gösteriyoruz
          const validationErrors = JSON.stringify(err.error.errors);
          alert('Hata: ' + validationErrors);
        } else {
          alert('Güncelleme sırasında hata oluştu.');
        }
      },
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
