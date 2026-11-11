# Kampüs Etkinlikleri — Backend (Sprint 7)

Namık Özköse · 2416501021

Node + Express ile etkinlikleri JSON olarak veren REST API. Veriler şimdilik bellekte tutulur: sunucu yeniden başlayınca POST ile eklenenler kaybolur (MongoDB Sprint 8'de).

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # http://localhost:3000
```

| Komut | Ne yapar |
| --- | --- |
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucuyu yeniden başlatır |
| `npm start` | `node src/server.js` |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | Sunucunun dinlediği port. `.env` yoksa 3000 kullanılır. |

`.env` GitHub'a gönderilmez (`.gitignore`); gerekli değişkenler `.env.example` dosyasında.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Dosyalar

| Dosya | İşi |
| --- | --- |
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), route'ları bağlar |
| `src/server.js` | `.env`'i okur, portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, yanıtı döndürür |
| `src/data/events.js` | Bellek içi etkinlik dizisi (6 kayıt) |
| `requests/kampus-api.json` | 6 isteklik Postman collection'ı (v2.1) |
