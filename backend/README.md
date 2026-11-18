# Kampüs Etkinlikleri — Backend (Sprint 8)

Namık Özköse · 2416501021

Node + Express + Mongoose ile etkinlikleri JSON olarak veren REST API. Etkinlikler artık **MongoDB**'de duruyor: sunucu kapanıp açılınca POST ile eklenenler kaybolmaz. Geliştirmede veritabanı MongoDB Atlas üzerindeki `kampus` veritabanı, `events` collection'ı.

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
| `npm run seed` | Önce `events`'i boşaltır (`deleteMany`), sonra 6 etkinlik ekler; kaç kez çalışırsa çalışsın 6 kayıt kalır |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. Yoksa 3000. |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | Veritabanı adresi, sonunda veritabanı adı (`/kampus`). Zorunlu: yoksa sunucu "MONGODB_URI tanımlı değil" diyerek başlamaz. |

`.env` GitHub'a gönderilmez (`.gitignore`). Gerçek Atlas adresi ve şifre sadece `.env` dosyasında durur; `.env.example`'da yer tutucu var.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — |
| GET | `/events` | Listeyi tarihe göre getir (`?category=Atölye` isteğe bağlı) | 200 | — |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 |
| POST | `/events` | Yeni etkinlik | 201 | 400 |

- Sprint 7'deki `event-2` gibi id'ler yok; her kaydın kimliği MongoDB'nin verdiği `_id` (ör. `6af57a006f13ad018f7b7a55`). Kayıtlarda `createdAt` ve `updatedAt` de var.
- Biçimi geçersiz id (`/events/yok`) ve bulunmayan id ikisi de **404** döner (500 değil).
- Doğrulamayı schema yapar, controller `ValidationError`'ı **400**'e çevirir. Beklenmeyen hata 500 `"Server error"` döner, sunucu çökmez.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

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
| `date` | zorunlu |
| `time`, `location` | varsayılan `""` (`location` trim) |
| `description` | `trim`, en fazla 500 karakter, varsayılan `""` |
| `createdAt`, `updatedAt` | `timestamps: true` ile otomatik |

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/config/database.js` | `connectDatabase()`: `MONGODB_URI` ile bağlanır, sadece host ve veritabanı adını yazar |
| `src/models/event-model.js` | Etkinlik schema'sı ve `Event` modeli (collection: `events`) |
| `src/data/seed-events.js` | 6 örnek etkinlik (id yok) |
| `src/seed.js` | `npm run seed`: sil, sonra ekle |
| `src/app.js` | Express uygulaması, middleware, route'lar, 404 ve hata middleware'i |
| `src/server.js` | `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | `Event.find` / `findById` / `create` ile isteği işler |
| `requests/kampus-api.json` | 6 isteklik Postman collection'ı (v2.1, 15 test) |

## Postman

`requests/kampus-api.json` dosyasını Postman'e **Import** et. Önce `npm run seed`, sonra `npm run dev`. İstekleri sırayla çalıştır ya da **Run collection** de: **2 Etkinlik listesi** ilk kaydın `_id`'sini `eventId` değişkenine kaydeder, **3 Tek etkinlik** onu kullanır. Her istekte test script'leri var (toplam 15 test).

| İstek | Beklenen |
| --- | --- |
| 1 Health | 200, `student: "2416501021"` |
| 2 Etkinlik listesi | 200, 6 kayıt (seed sonrası) |
| 3 Tek etkinlik | 200 |
| 4 Olmayan etkinlik (404) | 404 |
| 5 Etkinlik oluştur (201) | 201, `_id` ve `createdAt` |
| 6 Eksik veri (400) | 400, `date` ve `category` zorunlu |
