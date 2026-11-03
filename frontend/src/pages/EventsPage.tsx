import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

// Arama ve kategori sadece bu sayfanın işi: context'te değil, burada
function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section>
      <h2 className="bolum-baslik">Etkinlikler</h2>
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
        emptyText="Aramanıza uygun etkinlik bulunamadı."
        className="kartlar kartlar--uc"
      />
    </section>
  );
}

export default EventsPage;
