import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {

  // Backend adresi (RestApi launchSettings.json'daki https portu)
  private apiUrl = 'http://localhost:5203'; 

  transform(value: string | undefined | null): string {
    // 1. Resim yoksa placeholder gösteriyoruz
    if (!value) {
      return 'assets/placeholder.png'; // assets klasörüne bir tane placeholder.png atıyoruz
    }

    // 2. Eğer resim zaten tam bir URL ise (Amazon, Vatan linkleri gibi) olduğu gibi döndürüyoruz
    if (value.startsWith('http') || value.startsWith('https')) {
      return value;
    }

    // 3. Eğer resim relative path ise (/images/...) başına API adresini ekliyoruz
    return `${this.apiUrl}${value}`;
  }

}