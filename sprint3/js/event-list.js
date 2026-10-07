import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function createCard(event) {
  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
  
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p>${event.category}<br>Tarih: ${formattedDate}, ${event.time}<br>Yer: ${event.location}<br>Kontenjan: ${event.capacity} kişi<br>${event.description}</p>
    <a class="ok-link" href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
  </article>`;
}

function render(dizi) {
  if (list) {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

if (list) {
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    render(events);
  }
}

const filtreFormu = document.querySelector("#filtre-formu");
if (filtreFormu && aramaInput && kategoriSelect && sonucSatiri) {
  const kategoriler = new Set(events.map(e => e.category));
  kategoriler.forEach(kat => {
    const option = document.createElement("option");
    option.value = kat;
    option.textContent = kat;
    kategoriSelect.appendChild(option);
  });

  function filtrele() {
    const aranan = aramaInput.value.toLocaleLowerCase("tr-TR");
    const secilenKategori = kategoriSelect.value;
    
    const sonuc = events.filter(e => {
      const baslikUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
      const aciklamaUyuyor = e.description.toLocaleLowerCase("tr-TR").includes(aranan);
      const metinUyuyor = baslikUyuyor || aciklamaUyuyor;
      const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
      return metinUyuyor && kategoriUyuyor;
    });
    
    render(sonuc);
    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  aramaInput.addEventListener("input", filtrele);
  kategoriSelect.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", e => e.preventDefault());
  
  filtrele();
}

