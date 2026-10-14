https://kampus-etkinlik.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite + TypeScript + React)

Namık Özköse · 2416501021

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ klasörüne üretim çıktısı
npm run preview  # build edilmiş hâli açar
```

## Dosyalar ne iş yapıyor?

| Dosya | Görevi |
| --- | --- |
| `package.json` | Proje adını, komutları (dev, build, preview) ve kullanılan paketlerin listesini tutar. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kaydeder; herkes aynı sürümleri kurar. |
| `node_modules/` | npm install ile indirilen paketlerdir; .gitignore sayesinde GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript derleyicisinin ayarlarıdır (uygulama ve Vite yapılandırması için ayrı). |
| `vite.config.ts` | Vite'ın ayarlarıdır; React eklentisini burada etkinleştirir. |
| `index.html` | Uygulamanın tek HTML dosyasıdır; içinde React'in çizileceği boş `div#root` bulunur. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `#root` içine çizer. |
| `src/App.tsx` | Uygulamanın ana bileşenidir; 5 sayfanın hepsi state ile burada çizilir. |
| `src/App.css` | Sprint 3'ten taşınan, öğrenci numarasına göre renklenen stillerdir. |
| `src/index.css` | Tüm sayfaya genel stil dosyasıdır; bu sprintte boş bırakıldı. |
| `src/types/campus-event.ts` | `Category` ve `CampusEvent` tiplerini tanımlar (bir etkinlik neye benzer). |
| `src/data/events.ts` | `CampusEvent[]` tipindeki 6 etkinliğin kayıtlarıdır. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma için saf fonksiyonlardır. |
| `public/` | Olduğu gibi kopyalanan dosyalardır (`afis.svg`, `favicon.svg`). |

## Sayfalar

Router kullanılmaz; hangi sayfanın açık olduğunu `page` state'i belirler:
Ana Sayfa, Etkinlikler (arama + kategori), Detay, Ekle ve Güncelle (form sadece görünüm).
