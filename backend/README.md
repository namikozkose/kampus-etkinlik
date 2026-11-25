# Kampüs Etkinlikleri — Backend (Sprint 9)

Namık Özköse · 2416501021

Node + Express + Mongoose ile etkinlikleri yöneten REST API: listeleme, arama, yaklaşanlar, ekleme, güncelleme (PATCH) ve silme (DELETE). Etkinlikler **MongoDB**'de duruyor: sunucu kapanıp açılınca kayıtlar kaybolmaz. Geliştirmede veritabanı MongoDB Atlas üzerindeki `kampus` veritabanı, `events` collection'ı.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
                       # .env içindeki MONGODB_URI'yi kendi veritabanı adresinle değiştir
npm run seed           # events collection'ını 6 örnek etkinlikle doldurur
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucuyu yeniden başlatır |
| `npm start` | `node src/server.js` |
| `npm run seed` | Önce `events`'i boşaltır (`deleteMany`), sonra 6 etkinlik ekler; kaç kez çalışırsa çalışsın 6 kayıt kalır. 2 etkinlik geçmiş tarihli. |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. Yoksa 3000. |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | Veritabanı adresi, sonunda veritabanı adı (`/kampus`). Zorunlu: yoksa sunucu "MONGODB_URI tanımlı değil" diyerek başlamaz. |

`.env` GitHub'a gönderilmez (`.gitignore`). Gerçek Atlas adresi ve şifre sadece `.env` dosyasında durur; `.env.example`'da yer tutucu var.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | çalışıyor |
| GET | `/events` | Listeyi tarihe göre getir; `?search=` başlıkta arar (büyük/küçük harf fark etmez), `?category=` filtreler, ikisi birlikte de olur | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, tarihe göre sıralı (en yakın önce) | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları günceller, güncel kaydı döndürür | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil | 204 (gövde yok) | 404 | çalışıyor |

- Sprint 7'deki `event-2` gibi id'ler yok; her kaydın kimliği MongoDB'nin verdiği `_id` (ör. `6af57a006f13ad018f7b7a55`). Kayıtlarda `createdAt` ve `updatedAt` de var.
- Biçimi geçersiz id (`/events/yok`) ve bulunmayan id her yerde **404** döner (500 değil).
- **Tarih her yerde `"GG-AA-YYYY"`** (ör. `"15-10-2026"`). Veritabanında gerçek `Date` olarak durur, böylece sıralama ve `/upcoming` doğru çalışır. `"2026-12-20"` ya da `"31-02-2026"` gibi tarih 400 döner.
- PATCH: boş body 400 (`Body is empty`); `_id`, `createdAt`, `updatedAt`, `__v` değiştirilemez (400); schema kuralları güncellemede de çalışır (`runValidators`).
- Doğrulamayı schema yapar, controller `ValidationError`'ı **400**'e çevirir. Beklenmeyen hata 500 `"Server error"` döner, sunucu çökmez.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok (silindi) · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Schema kuralları (`src/models/event-model.js`)

| Alan | Kural |
| --- | --- |
| `title` | zorunlu, `trim`, 3–100 karakter |
| `category` | zorunlu, sadece `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` |
| `capacity` | sayı, en az 0, varsayılan 0 |
| `date` | zorunlu, `Date`; API'de `GG-AA-YYYY` (`set: parseDate`, `get: formatDate`) |
| `time`, `location` | varsayılan `""` (`location` trim) |
| `description` | `trim`, en fazla 500 karakter, varsayılan `""` |
| `createdAt`, `updatedAt` | `timestamps: true` ile otomatik |

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/config/database.js` | `connectDatabase()`: `MONGODB_URI` ile bağlanır, sadece host ve veritabanı adını yazar |
| `src/models/event-model.js` | Etkinlik schema'sı ve `Event` modeli (collection: `events`) |
| `src/utils/date.js` | `parseDate` ("15-10-2026" → Date), `formatDate` (Date → "15-10-2026"), `todayStart` (`/upcoming` için) |
| `src/data/seed-events.js` | 6 örnek etkinlik (id yok, 2'si geçmiş tarihli) |
| `src/seed.js` | `npm run seed`: sil, sonra ekle |
| `src/app.js` | Express uygulaması, middleware, route'lar, 404 ve hata middleware'i |
| `src/server.js` | `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider; `/upcoming`, `/:id`'den önce |
| `src/controllers/event-controller.js` | `find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete` ile isteği işler |
| `requests/kampus-api.json` | Sprint 9 Postman collection'ı: 18 istek, 45 test |
| `requests/run-results.json` | Collection Runner sonucu (Export Results) |

## Postman

`requests/kampus-api.json` dosyasını Postman'e **Import** et (aynı dosya: `https://webdersi.vercel.app/test.json`). Önce `npm run seed`, sonra `npm run dev`. Collection'a sağ tık › **Run collection** › **Run**: 18 istek, 45 test, hepsi yeşil. id'leri elle girmek gerekmez: **02** listedeki ilk `_id`'yi, **05** yeni kaydın `_id`'sini kaydeder; PATCH ve DELETE o yeni kayıtla çalışır, seed verisi bozulmaz.

Terminalden aynı test:

```bash
newman run https://webdersi.vercel.app/test.json
```
