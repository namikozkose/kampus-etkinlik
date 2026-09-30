# 🎓 Kampüs Etkinlikleri

Kampüsteki seminer, atölye ve sosyal etkinlikleri tek bir yerden listelemek, detaylarını görüntülemek ve yeni etkinlik eklemek için hazırlanmış bir web projesi.

🔗 **Canlı Site:** [kampus-etkinlik-two.vercel.app](https://kampus-etkinlik-two.vercel.app)

---

## 🎨 Sprint 2 — CSS ve Responsive

Sprint 1'deki HTML korunarak beş sayfaya tek bir stil dosyası bağlandı: [`css/2416501021.css`](css/2416501021.css).

- Renk paleti öğrenci numarasından türetilir: `--no: 2416501021` → `--ton: mod(var(--no), 360)` = **301**
- Font numaranın son hanesinden gelir: **1 → Verdana**
- Tüm renk ve boşluklar `var(--...)` değişkenleriyle yazıldı
- Etkinlik listesindeki geçici tablo kaldırıldı; etkinlikler `section > article` kartlar ve `display: grid` ile listeleniyor
- Mobil öncelikli tasarım: telefonda tek sütun, geniş ekranda 2–3 sütun; detay sayfasında afiş solda, künye sağda
- Formlarda etiketler alanın üstünde; boş gönderilen alan kırmızı çerçeve ve hata mesajıyla işaretleniyor

## 📌 Sprint 1 — Sadece HTML

Sitenin iskeleti **yalnızca HTML** kullanılarak, anlamsal (semantic) etiketlerle oluşturulmuştur.

## 📄 Sayfalar

| Sayfa | Dosya | Açıklama |
|-------|-------|----------|
| 🏠 Ana Sayfa | [`index.html`](index.html) | Karşılama metni ve yaklaşan etkinlikler |
| 📋 Etkinlikler | [`etkinlikler.html`](etkinlikler.html) | Tüm etkinliklerin kart listesi ve aylık program tablosu |
| 🔍 Etkinlik Detay | [`etkinlik-detay.html`](etkinlik-detay.html) | Afiş, künye bilgileri (tarih, yer, kategori, kontenjan) ve açıklama |
| ➕ Etkinlik Ekle | [`etkinlik-ekle.html`](etkinlik-ekle.html) | Yeni etkinlik ekleme formu |
| ✏️ Etkinlik Güncelle | [`etkinlik-guncelle.html`](etkinlik-guncelle.html) | Mevcut etkinliği düzenleme formu |

## 🧱 Kullanılan HTML Yapıları

- `header`, `nav`, `main`, `section`, `article`, `footer` ile anlamsal sayfa düzeni
- `figure` / `figcaption` ile açıklamalı afiş görseli
- `dl` / `dt` / `dd` ile etkinlik künyesi
- `time` etiketi ile makine tarafından okunabilir tarihler
- `table` / `caption` ile etkinlik listesi ve aylık program
- `form` elemanları ile ekleme ve güncelleme sayfaları

## 📁 Proje Yapısı

```
kampus-etkinlik/
├── index.html
├── etkinlikler.html
├── etkinlik-detay.html
├── etkinlik-ekle.html
├── etkinlik-guncelle.html
├── afis.jpg
├── css/
│   └── 2416501021.css
└── README.md
```

## 🚀 Çalıştırma

Herhangi bir kurulum gerekmez. `index.html` dosyasını tarayıcıda açmanız yeterlidir ya da [canlı siteyi](https://kampus-etkinlik-two.vercel.app) ziyaret edebilirsiniz.

## 🗺️ Yol Haritası

- [x] **Sprint 1:** HTML iskeleti
- [x] **Sprint 2:** CSS ile tasarım
- [ ] **Sprint 3:** JavaScript ile etkileşim

---

👤 **Namık Özköse** · 2416501021 · 2026
