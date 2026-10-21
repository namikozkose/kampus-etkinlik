import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const categories = [...new Set(events.map((e) => e.category))];

const subtitles: Partial<Record<PageName, string>> = {
  home: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
  events: "Ekim ayında kampüste düzenlenen etkinlikler.",
};

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

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

  const showDetail = (id: string) => go("detail", id);

  return (
    <>
      <Header title={title} text={subtitles[page]}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <a className="buton-link" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
              Tüm etkinlikleri gör
            </a>
          </section>
        )}

        {page === "events" && (
          <>
            <section>
              <EventFilter
                searchText={searchText}
                category={category}
                categories={categories}
                onSearchChange={setSearchText}
                onCategoryChange={setCategory}
              />
              {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
              <EventList
                events={filtered}
                onShowDetail={showDetail}
                emptyText="Aramanıza uygun etkinlik bulunamadı."
                className="kartlar kartlar--uc"
              />
            </section>

            <section>
              <h2>Ayın Programı</h2>
              <div className="tablo-kutu">
                <table>
                  <caption>Ekim Ayı Özet Programı</caption>
                  <thead>
                    <tr><th>Tarih</th><th>Etkinlik</th><th>Yer</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>12 Ekim</td><td>Kariyer Günleri</td><td>A Blok</td></tr>
                    <tr><td>20 Ekim</td><td>Robotik Atölyesi</td><td>Lab 2</td></tr>
                    <tr><td>27 Ekim</td><td>Siber Güvenlik</td><td>B Blok</td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutu">Böyle bir etkinlik yok. Listeden bir etkinlik seçin.</div>
            <a className="buton-link" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
              ← Listeye dön
            </a>
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && <EventForm onSubmit={() => window.scrollTo(0, 0)} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
