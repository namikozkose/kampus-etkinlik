import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const categories = [...new Set(events.map((e) => e.category))];

const formatDate = (date: string) =>
  new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik Bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <span className="rozet">{event.category}</span>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          className="ok-link"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        {page === "home" && (
          <p className="alt-baslik">
            Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.
          </p>
        )}
        {page === "events" && (
          <p className="alt-baslik">
            Ekim ayında kampüste düzenlenen etkinlikler.
          </p>
        )}
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="kartlar">{upcoming.map(renderCard)}</div>
            <a
              className="buton-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Tüm etkinlikleri gör
            </a>
          </section>
        )}

        {page === "events" && (
          <>
            <section>
              <form className="filtre" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="arama">Etkinlik ara</label>
                  <input
                    type="search"
                    id="arama"
                    placeholder="Örn. atölye, kariyer"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="kategori-filtre">Kategori</label>
                  <select
                    id="kategori-filtre"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as Category | "")
                    }
                  >
                    <option value="">Tümü</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <p className="sonuc">
                {filtered.length === 0
                  ? "Aramanıza uygun etkinlik bulunamadı."
                  : `${filtered.length} etkinlik listeleniyor.`}
              </p>
              <div className="kartlar kartlar--uc">
                {filtered.map(renderCard)}
              </div>
            </section>

            <section>
              <h2>Ayın Programı</h2>
              <div className="tablo-kutu">
                <table>
                  <caption>Ekim Ayı Özet Programı</caption>
                  <thead>
                    <tr>
                      <th>Tarih</th>
                      <th>Etkinlik</th>
                      <th>Yer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>12 Ekim</td>
                      <td>Kariyer Günleri</td>
                      <td>A Blok</td>
                    </tr>
                    <tr>
                      <td>20 Ekim</td>
                      <td>Robotik Atölyesi</td>
                      <td>Lab 2</td>
                    </tr>
                    <tr>
                      <td>27 Ekim</td>
                      <td>Siber Güvenlik</td>
                      <td>B Blok</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutu">
              Böyle bir etkinlik yok. Listeden bir etkinlik seçin.
            </div>
            <a
              className="buton-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img
                  src={selected.image}
                  alt={`${selected.title} etkinliği afişi`}
                />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}

            <section className="kunye">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </section>

            <section className="aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <div className="detay-linkler">
                <a
                  className="buton-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
                <a
                  className="buton-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </div>
            </section>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <p className="form-not">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <div>
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                id="title"
                type="text"
                maxLength={80}
                placeholder="Örn. Kariyer Günleri 2026"
              />
            </div>
            <div>
              <label htmlFor="category">Kategori</label>
              <select id="category" defaultValue="">
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </div>
            <div>
              <label htmlFor="date">Tarih</label>
              <input id="date" type="date" />
            </div>
            <div>
              <label htmlFor="time">Saat</label>
              <input id="time" type="time" />
            </div>
            <div>
              <label htmlFor="location">Yer</label>
              <input
                id="location"
                type="text"
                placeholder="Örn. A Blok Konferans Salonu"
              />
            </div>
            <div>
              <label htmlFor="capacity">Kontenjan</label>
              <input id="capacity" type="number" min={1} max={1000} />
            </div>
            <div>
              <label htmlFor="description">Açıklama</label>
              <textarea id="description" rows={5} />
            </div>
            <button type="submit">Kaydet</button>
          </form>
        )}
      </main>

      <footer>
        <p>Namık Özköse · 2416501021 · 2026</p>
      </footer>
    </>
  );
}

export default App;
