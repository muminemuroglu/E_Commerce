// interceptors dosyası ne işe yarar: Interceptor: Her isteğe Token eklemekle
// uğraşmamak için bir "Araya Giren" (Interceptor) yazdık. Token varsa otomatik header'a ekleniyor.
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Tarayıcı hafızasından token'ı alıyoruz
  const token = localStorage.getItem('token');

  // 2. Eğer token varsa, isteğin kopyasını alıyoruz ve header'a ekliyoruz
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Token eklenmiş isteği gönderiyoruz
    return next(clonedRequest);
  }

  // Token yoksa isteği olduğu gibi gönderiyoruz (Login/Register gibi)
  return next(req);
};