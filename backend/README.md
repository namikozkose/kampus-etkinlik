# Kampüs Etkinlikleri — Backend (Sprint 8)

Namık Özköse · 2416501021

🔗 **Canlı API:** _Vercel adresi buraya eklenecek_

Node + Express + Mongoose ile etkinlikleri yöneten REST API. Veriler **MongoDB**'de tutulur: geliştirirken bilgisayardaki MongoDB, canlıda **MongoDB Atlas** (Cloud). Hangisine bağlanılacağını `.env` içindeki `MONGODB_URI` belirler.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run seed           # 6 başlangıç etkinliğini veritabanına yükler
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucuyu yeniden başlatır |
| `npm start` | `node src/server.js` |
| `npm run seed` | `events` koleksiyonunu boşaltıp `src/data/events.js` içindeki 6 etkinliği ekler |

Yerel MongoDB arka planda çalışmıyorsa (Windows, yönetici PowerShell): `net start MongoDB`

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. Yoksa 3000. |
| `MONGODB_URI` | `mongodb+srv://KULLANICI:SIFRE@cluster0.xxxxx.mongodb.net/kampus?retryWrites=true&w=majority` | Veritabanı adresi. Yoksa `mongodb://localhost:27017/kampus`. |

`.env` GitHub'a gönderilmez (`.gitignore`); gerekli değişkenler `.env.example` dosyasında. Canlıda `MONGODB_URI` Vercel'de **Environment Variable** olarak tanımlıdır.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı), tarihe göre sıralı | 200 | — |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 |
| PUT / PATCH | `/events/:id` | Gönderilen alanları güncelle | 200 | 400, 404 |
| DELETE | `/events/:id` | Sil | 204 | 404 |

`id`, MongoDB'nin verdiği `_id`'dir (ör. `6afd46860f587c9b7a9e1975`); yanıtlarda frontend'deki `CampusEvent` tipiyle aynı şekilde `id` olarak döner.

**Doğrulama (Mongoose şeması):** `category` yalnızca `Seminer`, `Atölye`, `Söyleşi`, `Yarışma` olabilir · `date` `YYYY-AA-GG` biçiminde · `capacity` 0 veya daha büyük. Kurala uymayan istek 400 döner.

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), route'lar, hata yakalayıcı |
| `src/server.js` | `.env`'i okur, veritabanına bağlanır, portu dinler |
| `src/models/db.js` | Mongoose bağlantısı (`MONGODB_URI`), bağlantı olayları, kapanışta bağlantıyı kapatma |
| `src/models/event.js` | Etkinlik şeması ve `Event` modeli (`events` koleksiyonu) |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | Mongoose ile CRUD, yanıtı döndürür |
| `src/data/events.js` + `src/seed.js` | Başlangıç verisi ve onu veritabanına yükleyen script |
| `api/index.js` + `vercel.json` | Vercel'de Express uygulamasını serverless fonksiyon olarak çalıştırır |
| `requests/kampus-api.json` | **Namık Özköse** Postman collection'ı (11 istek, testli, v2.1) |

## Postman

`requests/kampus-api.json` dosyasını Postman'e **Import** edin. Adres `baseUrl` collection değişkeninden gelir (varsayılan `http://localhost:3000`; canlı test için Vercel adresi). İstekleri sırayla çalıştırın veya **Run collection** deyin: liste isteği `eventId`'yi, oluşturma isteği `newEventId`'yi kaydeder; sonraki istekler bunları kullanır.

## Test ekran görüntüleri (Vercel adresi üzerinde)

| İstek | Ekran görüntüsü |
| --- | --- |
| Collection Runner (tüm testler) | ![Tüm testler](tests/RunCollection.png) |
| GET /events | ![Liste](tests/ListEvents.png) |
| GET /events/:id | ![Tek etkinlik](tests/GetEvent.png) |
| POST /events | ![Ekle](tests/AddEvent.png) |
| PUT /events/:id | ![Güncelle](tests/UpdateEvent.png) |
| DELETE /events/:id | ![Sil](tests/DeleteEvent.png) |
