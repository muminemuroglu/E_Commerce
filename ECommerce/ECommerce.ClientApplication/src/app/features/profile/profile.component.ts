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
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  // DTO ile uyumlu model
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '', // Backend DTO'da PhoneNumber
    address: '',
    city: '',
    birthDate: '', // Bu Backend DTO'da yoksa eklenmeli veya UI'da pasif kalmalı
    gender: '',    // Bu Backend DTO'da yoksa eklenmeli
    marketingConsent: false
  };

  constructor(
    public authService: AuthService,
    private customerService: CustomerService // Ekle
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.customerService.getProfile().subscribe({
      next: (data) => {
        if (data) {
          // Backend'den gelen verileri forma eşle
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.email = data.email;
          this.user.phoneNumber = data.phoneNumber || '';
          this.user.address = data.address || '';
          this.user.city = data.city || '';
        }
      },
      error: (err) => console.error("Profil yüklenemedi", err)
    });
  }

  onSave() {
    // Backend'in beklediği DTO formatı
    const updateDto = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phoneNumber: this.user.phoneNumber,
      address: this.user.address,
      city: this.user.city || 'Belirtilmemiş', // Şehir boş gitmesin
      // UserId'yi göndermiyoruz, Backend token'dan alacak
    };

    this.customerService.updateProfile(updateDto).subscribe({
      next: (res) => {
        if (res.success) {
          alert("Bilgileriniz başarıyla güncellendi!");
          // Navbar'daki ismin güncellenmesi için AuthService'i yenilemek gerekebilir
          // Veya sayfayı yeniletebilirsin: location.reload();
        } else {
          alert(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert("Güncelleme sırasında hata oluştu.");
      }
    });
  }
  
  onLogout() {
    this.authService.logout();
  }
}