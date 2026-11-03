https://namikozkose-frontend.vercel.app

# Kampüs Etkinlikleri — Sprint 6 (React Router + Context)

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
| `vercel.json` | Vercel'de her adresi `index.html`'e yönlendirir; `/events` gibi bir adreste sayfa yenilenince 404 vermez. |
| `src/main.tsx` | React'i başlatır; `App`'i `BrowserRouter` ve `EventsProvider` ile sarar. |
| `src/App.tsx` | Kabuk: Header, Navigation, `Routes` (10 adres) ve Footer. State yok. |
| `src/pages/` | Adrese bağlı 10 sayfa; veriyi bulur ve bileşenlere verir. |
| `src/context/EventsContext.tsx` | Etkinlik listesi ile `addEvent`, `updateEvent`, `deleteEvent`; `useEvents()` ile okunur. |
| `src/components/` | Sadece çizen bileşenler: `layout/`, `events/`, `forms/EventForm`. |
| `src/App.css` | Sprint 3'ten taşınan, öğrenci numarasına göre renklenen stillerdir. |
| `src/index.css` | Tüm sayfaya genel stil dosyasıdır; bu sprintte boş bırakıldı. |
| `src/types/campus-event.ts` | `Category`, `CampusEvent`, form için `EventFormData` ve `EventFormErrors` tipleri. |
| `src/data/events.ts` | `CampusEvent[]` tipindeki 6 etkinliğin kayıtlarıdır. |
| `src/utils/filter-events.ts` | Arama, kategori filtresi ve id ile bulma için saf fonksiyonlardır. |
| `src/utils/format-date.ts` | Tarihi "12 Ekim 2026" biçiminde yazar. |
| `src/utils/validate-event.ts` | Etkinlik formunun kuralları; hata yoksa `{}` döner. |
| `public/` | Olduğu gibi kopyalanan dosyalardır (`afis.svg`, `favicon.svg`). |

## Sayfalar

Hangi sayfanın açık olduğunu adres belirler (React Router):

| Adres | Sayfa |
| --- | --- |
| `/` | HomePage: yaklaşan 2 etkinlik |
| `/events` | EventsPage: arama + kategori filtresi |
| `/events/:id` | EventDetailPage: `useParams` ile id, yoksa "Sayfa bulunamadı" |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage: tablo, Düzenle, Sil (onaylı), Yeni etkinlik |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

Veriler bellekte tutulur: sayfa yenilenince liste başa döner (backend sonraki sprintlerde).
