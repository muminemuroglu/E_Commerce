# 🛒 E-Commerce Platform (Multi-Tenant) — Admin Panel + REST API + Angular Storefront

> Bu proje; farklı şirketlerin kendi e-ticaret operasyonlarını yönetebildiği **çok katmanlı bir E-Ticaret Servis Platformu**dur.  
> Mimari; **REST API (çekirdek köprü)** üzerine kuruludur. Hem **Admin Panel** (şirket yönetimi) hem de **Angular Storefront** tüm veriye **API üzerinden** erişir. 

---

## 🎯 Proje Amacı

- Kurumsal düzeyde **Admin Panel (Company Management)** geliştirmek  
- Modern standartlara uygun **REST API** üretmek (JWT, Role Based, Swagger, DTO, AutoMapper, Validation, Logging) 
- **Angular** ile kullanıcıya yönelik **storefront** geliştirmek (auth guard, interceptor, lazy loading, search, pagination, responsive) 
- **Clean / Layered Architecture** yaklaşımını tek projede uçtan uca deneyimlemek

---

## 🧩 Genel Bakış

Bu repo 3 ana parçadan oluşur:

1. **REST API** → Sistemin çekirdeği / veri köprüsü  
2. **Admin Panel** → Şirketlerin ürün, kategori, marka, sipariş, müşteri vb. yönetimi  
3. **Client Application (Angular)** → Müşterinin alışveriş yaptığı storefront

📌 **Tek veri kapısı REST API’dir.** Admin Panel ve Angular Client doğrudan veritabanına bağlanmaz; yalnızca API tüketir. 

---

## 🧠 Mimari Yaklaşım

Bu proje, REST API’yi merkez alan, istemcilerin (Admin Panel + Angular Client) API üzerinden sisteme eriştiği çok katmanlı (Clean / Layered) mimari ile tasarlanmıştır.

### 1) Solution Yapısı

Proje **katmanlı mimari (layered architecture)** prensiplerine uygun olarak geliştirilmiştir.
```
E-Commerce/
├── ECommerce_RestApi/                       → REST API (Sistemin çekirdeği / köprü)
│   └── src/
│       ├── Core/
│       │   ├── ECommerce.Application/      → UseCase’ler, DTO, Interfaces, Helpers, Mappings, JWT
│       │   └── ECommerce.Domain/           → Entity’ler, Domain Interfaces, kurallar
│       ├── Infrastructure/                → DbContext, Migration, Repository, Service Implementations
│       └── Presentation/                  → Controllers, Filters, Middlewares, Attributes, Swagger, Config
│
├── ECommerce_AdminPanel/  → Admin UI (ASP.NET Core / Razor Pages veya MVC UI)
│   ├── Pages/Views/Controllers   → UI katmanı
│   ├── Services                  → API tüketen servisler / UI business
│   └── ...                       → Layout, static, helpers
│
└── ECommerce_ClientApplication/  → Client UI (Angular)
    └── src/
        ├── app/
        │   ├── core/             → auth, guards, interceptors, api services
        │   ├── features/         → ürünler, sepet, sipariş vb.
        │   ├── shared/           → ortak component/pipes
        │   └── layout/           → header/footer/shell
        └── environments/         → api base url vb.

```

## 2) Katmanların Sorumlulukları
### ✅ Domain (Core/Domain)

- Sistemin iş kuralları, entity modelleri
- Bağımlılık almaz, “en saf” katmandır

### ✅ Application (Core/Application)

- Use-case odaklı iş akışları
- DTO’lar, interface sözleşmeleri, mapping profilleri
- Auth/JWT, helper yapıları (gerekli olanlar)

“Ne yapılacak?” burada tanımlanır

### ✅ Infrastructure

“Nasıl yapılacak?” kısmı

- EF Core DbContext, Migration’lar, Repository implementasyonları
- Harici servis / veri erişim implementasyonları

### ✅ Presentation (REST API)

- Controller’lar ile HTTP endpointleri
- Authorization/Filters/Middlewares
- Swagger ve API konfigürasyonları

İstemcilerin tek giriş kapısı

##  3) İstemci Uygulamalar
### ✅ Admin Panel (ASP.NET Core UI)

- Admin / CompanyManager / Staff gibi rollerin yönetim ekranı
- Ürün/Kategori/Marka/Sipariş vb. CRUD işlemleri
- Veriye erişmek için doğrudan DB’ye değil API’ye gider
- Role-based ekran ve aksiyon yönetimi

### ✅ Client Application (Angular)

- Müşterinin alışveriş yaptığı arayüz
- Ürün listeleme, detay, sepet, sipariş süreçleri
- Tüm işlemler için REST API üzerinden iletişim kurar

##  4) Temel Prensip

📌 Tek veri kapısı REST API’dir.
AdminPanel ve Angular Client DB’ye doğrudan erişmez, sadece API tüketir.
Bu yaklaşım; güvenlik, ölçeklenebilirlik ve bakım kolaylığı sağlar.

---

📌 **UI → Service → DbContext** zinciri korunur  
📌 Razor Pages doğrudan DbContext’e erişmez  
📌 Tüm işlemler kullanıcı bazlı filtrelenir

---

## 🔐 Kimlik Doğrulama & Güvenlik (Admin Panel Tarafı)

- Cookie tabanlı authentication
- `ClaimTypes.NameIdentifier` ile kullanıcı tanımlama
- Şirket sahibi veya personel yalnızca **kendi markalarını, kategorilerini ve ürünlerini** görür
- Multi-tenant veri izolasyonu

---

## 🧩 Modüller & Özellikler

Aşağıdaki modüller hem Admin Panel hem de REST API tarafında (ilgili rollere göre) kurgulanmıştır: 

### Admin Panel (Şirket Yönetimi)
- Dashboard (toplam ürün/kullanıcı/sipariş/yorum)
- Ürün Yönetimi (listeleme, ekleme, güncelleme, silme, marka/kategori bağlama)
- Kategori Yönetimi (CRUD)
- Marka Yönetimi (CRUD)
- Sipariş Yönetimi (durum güncelleme, iptal/iade/kargo)
- Müşteri Yönetimi
- Yorum Yönetimi
- Kargo Ayarları
- Genel Ayarlar
- Kullanıcı & Rol Yönetimi
- Banner/Slider, ürün görsel yönetimi

### REST API (Sistemin çekirdeği)
- Products (Pagination + Search)
- Categories, Brands
- Customers
- Orders (status update, refund, cancel, tracking)
- Reviews
- Banners
- Admin Users & Roles
- Standart response formatı:
  
```json
{ "success": true, "message": "", "data": {} }

```

### Angular Storefront

- Anasayfa + slider
- Kategoriye göre ürün listeleme
- Ürün detay
- Sepet yönetimi
- Üye kayıt & giriş (JWT)
- Profil & adres yönetimi
- Checkout / sipariş oluşturma
- Sipariş geçmişi
- Yorum ekleme
- 404 / 500 hata sayfaları
- Global exception interceptor, loading spinner, pagination, search, responsive zorunlulukları 

## 🔐 Güvenlik

### REST API
- JWT Authentication
- Role Based Authorization
- Şirket bazlı API Key desteği 
- Global Exception Handling Middleware + Logging (Serilog vb.) + Swagger zorunlu 

### Admin Panel
- Session / Cookie tabanlı oturum yönetimi
- Sayfa/rol bazlı yetkilendirme
- Validation + Custom Error Handling zorunlu 


### Angular
- JWT login
- Auth Guard + Role Guard
- Auth Interceptor (token ekleme)
- Global Exception Interceptor 

---

## ⚙️ Kullanılan Teknolojiler

| Katman | Teknoloji |
|------|-----------|
| REST API | ASP.NET Core Web API, EF Core, AutoMapper, Swagger, JWT, Middleware |
| Admin Panel | ASP.NET Core MVC, Bootstrap 5 |
| FrontEnd | Angular, Guards, Interceptors, Lazy Loading |
| Veritabanı | SQLite |
| Auth | Cookie Authentication |
| Session | ASP.NET Session |

---

## 🚀 Kurulum & Çalıştırma

### 🧩 REST API — Kurulum
```bash
# Repo'yu klonla
git clone https://github.com/tubanursmsk/E-Commerce.git
cd E-Commerce

# Bağımlılıkları yükle
dotnet restore

# Veritabanını oluştur
dotnet ef database update

# Uygulamayı çalıştır
dotnet run
```

```arduino
http://localhost:5271
```

### 🧩 Admin Panel — Kurulum
```bash
cd AdminPanel
dotnet restore
dotnet run
```
```arduino
http://localhost:5176
```
- Admin Panel, veri işlemleri için REST API’ye istek atar (tasarım/kurgu bu şekildedir).

### 🧩 Angular Client — Kurulum
```bash
cd FrontEnd
npm install
ng serve
```
```arduino
http://localhost:4200
```

## 🗄️ Veritabanı

- SQLite kullanılmıştır
- EF Core migrations desteklidir
- Her tablo UserId ile filtrelenir (multi-tenant yapı)

---

## 👥 Demo Hesaplar

| Rol             | Email                  | Şifre   | 
|-----------------|------------------------|---------|
| Admin           | tuba@example.com       | Aa12345 |
| CompanyManager  | kemal@example.com      | Aa12345 |
| Staff           | zeynep@mail.com        | Aa12345 |
| Customer        | sevgi@mail.com         | Aa12345 |

---

## 📌 API Endpointleri (Özet)

- Aşağıdaki tablo proje yönergesindeki zorunlu modülleri temsil eder. Kesin endpoint rotaları için Swagger esas alınır.
  
| Modül               | Açıklama                                   |
| ------------------- | ------------------------------------------ |
| Auth                | JWT Login/Register/Profile                 |
| Products            | Pagination + Search + CRUD                 |
| Categories          | CRUD                                       |
| Brands              | CRUD                                       |
| Customers           | CRUD                                       |
| Orders              | Status update / refund / cancel / tracking |
| Reviews             | CRUD                                       |
| Banners             | CRUD                                       |
| Admin Users & Roles | RBAC yönetimi                              |

---

## 🔄 İş Akışı (Flow Diagram)

### Sistem Seviyesi Akış (AdminPanel + Client → API → DB)
```mermaid
graph LR
  A[Admin Panel] -->|HTTP| B[REST API]
  C[Angular Client] -->|HTTP| B[REST API]
  B --> D[(Database)]
```

### Admin Panel Akışı (Marka / Kategori / Ürün)
```mermaid
graph TB
    A[👤 Kullanıcı Girişi] --> B{🔐 Kimlik Doğrulama}
    B -->|✅ Başarılı| C[📊 Dashboard]
    B -->|❌ Başarısız| D[🔒 Login Sayfası]

    C --> E[🏷️ Marka Yönetimi]
    C --> F[🗂️ Kategori Yönetimi]
    C --> G[📦 Ürün Yönetimi]
    C --> H[🧾 Sipariş / 👥 Müşteri / 💬 Yorum vb.]

    E --> H[➕ Ekle / ✏️ Güncelle / 🗑️ Sil]
    F --> I[➕ Ekle / ✏️ Güncelle / 🗑️ Sil]
    G --> G1[➕ Ürün Ekle / 🖼️ Görsel / 🔎 Search / 📄 Pagination]

    E1 --> DB[(🗄️ DB)]
    F1 --> DB
    G1 --> DB
```

---

## 🖼️ Ekran Görüntüleri / Videolar

### Swagger - Rest API Dokümantasyonu
<img width="1710" height="1072" alt="Ekran Resmi 2026-02-15 16 54 20" src="https://github.com/user-attachments/assets/59c7d0fa-5c8a-42a8-91e7-930d250bf1fd" />
<img width="1702" height="1068" alt="Ekran Resmi 2026-02-15 16 55 33" src="https://github.com/user-attachments/assets/e961cb6a-476f-4eae-a7f1-d4a581c22617" />
<img width="1685" height="1058" alt="Ekran Resmi 2026-02-15 16 57 11" src="https://github.com/user-attachments/assets/915fb41c-5cce-41fb-bb81-acce558bc9b7" />
<img width="1707" height="1069" alt="Ekran Resmi 2026-02-15 17 04 29" src="https://github.com/user-attachments/assets/99da9d5d-c213-4e20-b6e4-c22bb5158093" />


### 👩‍💻 Admin Panel

**Dashboard (toplam ürün/kullanıcı/sipariş/yorum)**
<img width="1709" height="1069" alt="Ekran Resmi 2026-02-15 17 07 27" src="https://github.com/user-attachments/assets/49f1245e-d05a-4d21-b9b5-47208e496653" />

**Ürün Yönetimi (listeleme, ekleme, güncelleme, silme, marka/kategori bağlama)**
<img width="1710" height="1073" alt="Ekran Resmi 2026-02-15 18 07 31" src="https://github.com/user-attachments/assets/a1ce7d50-67f3-4027-b4ec-213bb0eb4776" />
<img width="1710" height="1058" alt="Ekran Resmi 2026-02-15 17 56 08" src="https://github.com/user-attachments/assets/a65f81c5-aaa2-43c8-9fa1-07c24a2862a3" />

**Kategori Yönetimi (CRUD)**
<img width="1710" height="1065" alt="Ekran Resmi 2026-02-15 18 06 34" src="https://github.com/user-attachments/assets/cf959d14-dfbd-43f2-90e7-db1d662520c9" />

**Marka Yönetimi (CRUD)**
<img width="1708" height="1084" alt="Ekran Resmi 2026-02-15 18 32 12" src="https://github.com/user-attachments/assets/b57ca8cd-1feb-481c-9b24-7fe76c4ee22f" />

**Sipariş Yönetimi (durum güncelleme, iptal/iade/kargo)**
<img width="1710" height="1082" alt="Ekran Resmi 2026-02-15 18 34 30" src="https://github.com/user-attachments/assets/fac5c1c1-8f7a-4637-859b-0e846258412f" />
<img width="1710" height="1072" alt="Ekran Resmi 2026-02-15 18 35 25" src="https://github.com/user-attachments/assets/4d75811e-ba49-4bd4-bda2-7b45ce3594e1" />

**Müşteri Yönetimi**
<img width="1706" height="1072" alt="Ekran Resmi 2026-02-15 18 36 04" src="https://github.com/user-attachments/assets/61b7dbb3-0d1f-4964-be36-0a7feed5b06a" />
<img width="1710" height="1068" alt="Ekran Resmi 2026-02-15 18 37 05" src="https://github.com/user-attachments/assets/6f1dcfb7-2a52-4e0f-ba1b-224be2a2b195" />

**Yorum Yönetimi**
<img width="1702" height="1065" alt="Ekran Resmi 2026-02-15 18 38 08" src="https://github.com/user-attachments/assets/6819dfcb-efb4-4a09-8efa-6677562a211b" />

**Kargo Ayarları**
<img width="1709" height="1066" alt="Ekran Resmi 2026-02-15 18 38 57" src="https://github.com/user-attachments/assets/b28ad84c-7a3b-414a-802d-939afc507056" />
<img width="1709" height="1061" alt="Ekran Resmi 2026-02-15 18 39 24" src="https://github.com/user-attachments/assets/6b3e3ba0-fc62-4424-80a3-4f0d94949c28" />

**Kullanıcı & Rol Yönetimi**
<img width="1708" height="1075" alt="Ekran Resmi 2026-02-15 18 43 31" src="https://github.com/user-attachments/assets/ace3e32f-5e15-4054-9d65-3d30f77b8c08" />
<img width="1710" height="1058" alt="Ekran Resmi 2026-02-15 18 44 13" src="https://github.com/user-attachments/assets/d7240078-755b-4fa7-893e-e41d9c7378ca" />

**Banner/Slider, ürün görsel yönetimi**
<img width="1697" height="1047" alt="Ekran Resmi 2026-02-15 18 46 03" src="https://github.com/user-attachments/assets/8328aa77-9487-4713-bc99-7b02b5c73baf" />
<img width="1707" height="1072" alt="Ekran Resmi 2026-02-15 18 45 20" src="https://github.com/user-attachments/assets/4c2a0c6d-813f-4b58-83db-2a181da32ab5" />

**Şirket Ayarları**
<img width="1710" height="1079" alt="Ekran Resmi 2026-02-15 18 47 58" src="https://github.com/user-attachments/assets/8421d7fe-d7f0-459f-9546-e5fdda713d9a" />
<img width="1710" height="1079" alt="Ekran Resmi 2026-02-15 18 47 58" src="https://github.com/user-attachments/assets/e5ba8993-ceb1-4df6-bf9f-e0cdd7769d7e" />

**Profil Ayarları**
<img width="1710" height="1079" alt="Ekran Resmi 2026-02-15 18 47 58" src="https://github.com/user-attachments/assets/31b1cdf8-ec07-40db-88ab-980bfc6e9d46" />
<img width="1710" height="1069" alt="Ekran Resmi 2026-02-15 19 02 44" src="https://github.com/user-attachments/assets/027b491d-f27a-4db3-b96a-9c82755ae0b9" />

**Müşteri kayıt & giriş (JWT)**
<img width="1699" height="1066" alt="Ekran Resmi 2026-02-15 19 03 46" src="https://github.com/user-attachments/assets/8891a4c7-54f6-46e4-b3ae-54384b3e3d22" />
<img width="1708" height="1069" alt="Ekran Resmi 2026-02-15 19 04 10" src="https://github.com/user-attachments/assets/fb418414-9286-4df6-a51b-4c106cfb17ee" />

### 🧩 Angular Client


**Anasayfa + slider**
<img width="1708" height="1072" alt="Ekran Resmi 2026-02-15 19 06 41" src="https://github.com/user-attachments/assets/7dd891c6-e6f9-4b5f-acf7-5934060a9d0f" />

**Kategoriye göre ürün listeleme**
<img width="1697" height="1073" alt="Ekran Resmi 2026-02-15 19 08 46" src="https://github.com/user-attachments/assets/4c3ee44f-4a2a-4b11-a3f6-14e2e9946e2e" />

**Ürün detay**
<img width="1480" height="933" alt="Ekran Resmi 2026-02-15 19 11 06" src="https://github.com/user-attachments/assets/860044e7-5f02-4de1-8ec7-b18c563e5776" />

**Üye kayıt & giriş (JWT)**
<img width="1681" height="949" alt="Ekran Resmi 2026-02-15 19 11 41" src="https://github.com/user-attachments/assets/59df3a27-904b-4ab7-825a-bd7d059a5bbd" />
<img width="1699" height="944" alt="Ekran Resmi 2026-02-15 19 12 28" src="https://github.com/user-attachments/assets/4b13e903-029e-4320-8381-86af55a74866" />

**Profil & adres yönetimi**
<img width="1574" height="948" alt="Ekran Resmi 2026-02-15 19 13 20" src="https://github.com/user-attachments/assets/d998b89c-f97f-4a96-8b22-b04225d806b9" />

**Checkout / sipariş oluşturma**
<img width="1604" height="945" alt="Ekran Resmi 2026-02-15 19 15 23" src="https://github.com/user-attachments/assets/bc4d7a22-e6b0-4c99-925b-b2dcda9cf5e7" />
<img width="1558" height="948" alt="Ekran Resmi 2026-02-15 19 14 53" src="https://github.com/user-attachments/assets/bdcfaa1c-bd35-4912-807f-5df0c489be25" />

**Sipariş geçmişi**
<img width="1624" height="949" alt="Ekran Resmi 2026-02-15 19 15 56" src="https://github.com/user-attachments/assets/ba5edc1c-b76d-4a15-bf0f-fbcb1a2fac7c" />
<img width="1672" height="947" alt="Ekran Resmi 2026-02-15 19 17 05" src="https://github.com/user-attachments/assets/945f8494-a7ac-4e92-9adc-55ef22952391" />

**Yorum ekleme**
<img width="1416" height="944" alt="Ekran Resmi 2026-02-15 19 17 50" src="https://github.com/user-attachments/assets/685200ac-ca11-490a-9064-1847538737a3" />

**404 / 500 hata sayfaları**
<img width="1651" height="946" alt="Ekran Resmi 2026-02-15 19 18 29" src="https://github.com/user-attachments/assets/6dbaa5b8-3a34-43e6-9857-85ba707bc378" />
<img width="1590" height="951" alt="Ekran Resmi 2026-02-15 19 19 46" src="https://github.com/user-attachments/assets/c51fbdc5-8107-4ff0-8153-eb4012fe073a" />

---

### 🎓 Öğrenme Kazanımları
- Katmanlı mimariyi (Core/Application/Domain + Infrastructure + Presentation) gerçek proje üstünde uygulama
- Admin Panel + API + Angular istemci entegrasyonu
- JWT / Session / Role Based Authorization pratikleri
- Global exception handling + logging + validation standartları

---

## 👩‍💻 Geliştirici
**Mümine Muroğlu** (Software Developer)

```bash
🔗 GitHub: https://github.com/muminemuroglu
```

---

## 🧾 Lisans

MIT License © 2025 — muminemuroglu

---

## 🏷️ Etiketler

`.NET Razor Pages Entity Framework Core SQLite`
`Admin Panel E-Commerce Multi-Tenant CRUD`
`Layered Architecture Bootstrap Backend Development` `C#`
`Console App` `Katmanlı Mimari` `ASP.Net Core`
