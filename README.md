https://kampus-etkinlik.vercel.app

# Kampüs Etkinlikleri

Bu proje, kampüsteki etkinliklerin (seminerler, atölyeler, söyleşiler) tek bir platform üzerinden takip edilmesini sağlayan bir web uygulamasıdır. Proje, 3 aşamalı sprint yapısıyla, tamamen Vanilla JS (framework kullanılmadan) geliştirilmiştir.

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

---
**Geliştirici:** Namık Özköse · 2416501021
