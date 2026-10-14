https://kampus-etkinlik.vercel.app

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

---
**Geliştirici:** Namık Özköse · 2416501021

