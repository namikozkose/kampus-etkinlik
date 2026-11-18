https://namikozkose-frontend.vercel.app

# Kampüs Etkinlikleri

Bu proje, kampüsteki etkinliklerin (seminerler, atölyeler, söyleşiler) tek bir platform üzerinden takip edilmesini sağlayan bir web uygulamasıdır. İlk 3 sprint Vanilla JS ile, Sprint 4'ten itibaren Vite + TypeScript + React ile geliştirilmiştir.

## 🚀 Sprint 1: Temeller
- Temel HTML iskeletinin kurulması.
- Semantik (anlamsal) etiketlerin kullanılması.
- Basit CSS stilleri ile sayfanın ana şablonunun oluşturulması.

## 🎨 Sprint 2: Tasarım ve Düzen
- Sayfaların statik tasarımı (CSS Grid ve Flexbox kullanımı).
- Etkinlik kartlarının HTML üzerinde statik olarak kodlanması.
- Ekleme ve Güncelleme sayfalarındaki form arayüzlerinin oluşturulması.
- Tasarımın tüm sayfalarda tutarlı, erişilebilir ve mobil uyumlu hale getirilmesi.

## ⚙️ Sprint 3: JavaScript & DOM Manipülasyonu
- Verilerin statik HTML'den çıkarılıp tek bir `data.js` dosyası üzerinden modüllerle yönetilmesi.
- `event-list.js` ile etkinliklerin dinamik olarak sayfaya yazdırılması (Ana sayfada yaklaşan 2 etkinlik, liste sayfasında tamamı).
- Etkinlikler sayfasında "arama" ve "kategori" filtrelerinin anlık (real-time) olarak çalışır hale getirilmesi.
- URL'den `?id=` parametresi okunarak `event-detail.js` ile doğru etkinliğin detay sayfasının dinamik oluşturulması. Geçersiz ID'lerde hata gösterimi.
- Formlarda (`event-form.js`) JavaScript ile gelişmiş doğrulama (validation) işlemleri. (Ad, kategori, tarih, saat, kontenjan ve açıklama kontrolleri, `FormData` kullanımı ve verilerin JSON formatında üretilmesi).

## ⚛️ Sprint 4: Vite, TypeScript ve React
- `frontend/` klasöründe Vite React-TS projesi kuruldu; Sprint 3 CSS'i `src/App.css`'e taşındı.
- `types/campus-event.ts` ile `Category` (union type) ve `CampusEvent` tipleri tanımlandı.
- Veri `data/events.ts` dosyasına `CampusEvent[]` tipiyle taşındı.
- `utils/filter-events.ts` içinde saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`.
- 5 sayfa tek `App.tsx` içinde; sayfa geçişi, arama ve kategori `useState` ile, sekme başlığı `useEffect` ile.
- Dosyaların açıklamaları: [frontend/README.md](frontend/README.md)

## 🧭 Sprint 6 + Vize: Router, Context ve Yönetim
- `react-router-dom` ile 10 adres, 10 sayfa (`src/pages/`). `App.tsx` sadece Header, Navigation, Routes ve Footer; state yok.
- Menü `NavLink`, sayfa içi bağlantılar `Link`, kayıttan sonra yönlendirme `useNavigate`.
- `context/EventsContext.tsx`: etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent` tek yerde; sayfalar `useEvents()` ile alır.
- `EventForm` controlled form; kurallar `utils/validate-event.ts` içinde saf fonksiyon.
- Yönetim sayfası: tablo, Düzenle, Sil (onaylı), Yeni etkinlik. Telefonda tablo karta dönüşür.
- Giriş, Kayıt ve Şifremi Unuttum sayfaları: sadece arayüz ve doğrulama, bilgiler hiçbir yere gönderilmez.

### Canlı adres
https://namikozkose-frontend.vercel.app

### Kurulum
```bash
cd frontend
npm install
npm run dev
```

### Route listesi
| Adres | Sayfa |
| --- | --- |
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

## 🖥️ Sprint 7: Express ile REST API
- Repo kökünde `frontend/` yanına ayrı `backend/` uygulaması: Node + Express, `localhost:3000`.
- `GET /health`, `GET /events`, `GET /events/:id`, `POST /events`; veriler şimdilik bellekte.
- Port `.env`'den okunur; route ve controller ayrı dosyalarda.
- Çalıştırma, PORT ve REST sözleşmesi: [backend/README.md](backend/README.md)

## 🍃 Sprint 8: MongoDB, Mongoose ve Canlıya Alma
- Bellek içi dizi yerine **MongoDB**: `src/models/db.js` bağlantıyı `.env`'deki `MONGODB_URI`'den alır (yoksa yerel `mongodb://localhost:27017/kampus`).
- `src/models/event.js`: Mongoose şeması (zorunlu alanlar, kategori listesi, tarih biçimi, kapasite ≥ 0) ve `Event` modeli.
- Tam CRUD: `GET`, `POST`, `PUT`/`PATCH`, `DELETE /events/:id`; hatalı veri 400, olmayan kayıt 404.
- `npm run seed` 6 başlangıç etkinliğini veritabanına yükler.
- Veritabanı **MongoDB Atlas** üzerinde, API **Vercel** üzerinde; `MONGODB_URI` Vercel'de ortam değişkeni.
- Postman collection'ı (**Namık Özköse**, 11 istek, otomatik testli): `backend/requests/kampus-api.json`, test ekran görüntüleri: [backend/README.md](backend/README.md#test-ekran-görüntüleri-vercel-adresi-üzerinde)

### Canlı API
_Vercel adresi buraya eklenecek_

---
**Geliştirici:** Namık Özköse · 2416501021

