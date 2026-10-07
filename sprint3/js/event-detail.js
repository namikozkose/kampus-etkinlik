import { events } from "./data.js";

const container = document.querySelector("#detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  if (container) {
    container.innerHTML = `
      <div style="border: 1px solid red; padding: 1rem; color: red; margin-bottom: 1rem; background-color: #ffe6e6;">
        "${id || 'id belirtilmemiş'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.
      </div>
      <a class="ok-link" style="padding:0.5rem 1rem; background-color:#2a7a38; color:white; text-decoration:none; border-radius:4px;" href="etkinlikler.html">← Listeye dön</a>
    `;
  }
} else {
  document.title = `${event.title} - Detay`;
  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
  
  if (container) {
    container.innerHTML = `
      <figure>
          <img src="afis.jpg" alt="${event.title} etkinliği afişi">
      </figure>

      <div>
          <dl class="kunye">
              <dt>Tarih</dt>
              <dd><time datetime="${event.date}T${event.time}">${formattedDate}, ${event.time}</time></dd>

              <dt>Yer</dt>
              <dd>${event.location}</dd>

              <dt>Kategori</dt>
              <dd>${event.category}</dd>

              <dt>Kontenjan</dt>
              <dd>${event.capacity || 'Sınırsız'} kişi</dd>
          </dl>

          <h3>Açıklama</h3>
          <p>${event.description}</p>

          <div class="detay-linkler" style="display:flex; gap:1rem; margin-top:2rem;">
              <a class="ok-link" style="padding:0.5rem 1rem; background-color:#2a7a38; color:white; text-decoration:none; border-radius:4px;" href="etkinlikler.html">← Listeye dön</a>
              <a class="ok-link" style="padding:0.5rem 1rem; background-color:#2a7a38; color:white; text-decoration:none; border-radius:4px;" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
          </div>
      </div>
    `;
  }
}

