import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
  if (form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find((e) => e.id === id);
    if (etkinlik) {
      form.elements.ad.value = etkinlik.title;
      form.elements.kategori.value = etkinlik.category;
      form.elements.tarih.value = etkinlik.date;
      form.elements.saat.value = etkinlik.time;
      form.elements.yer.value = etkinlik.location;
      if (form.elements.kontenjan && etkinlik.capacity) {
         form.elements.kontenjan.value = etkinlik.capacity;
      }
      form.elements.aciklama.value = etkinlik.description;
    } else {
      form.outerHTML = `
        <div style="border: 1px solid red; padding: 1rem; color: red; margin-bottom: 1rem; background-color: #ffe6e6;">
          Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
        </div>
        <a class="ok-link" style="padding:0.5rem 1rem; background-color:#2a7a38; color:white; text-decoration:none; border-radius:4px; display:inline-block;" href="etkinlikler.html">Etkinliklere git</a>
      `;
    }
  }

  if (document.body.contains(form)) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const data = {
          id: form.dataset.mode === "guncelle" ? new URLSearchParams(location.search).get("id") : "event-7",
          title: fd.get("ad").trim(),
          category: fd.get("kategori"),
          date: fd.get("tarih"),
          time: fd.get("saat"),
          location: fd.get("yer").trim(),
          capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
          description: fd.get("aciklama").trim()
        };

        const errors = {};
        
        if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
        if (!data.category) errors.kategori = "Lütfen bir kategori seçin.";
        if (!data.date) errors.tarih = "Tarih boş bırakılamaz.";
        if (!data.time) errors.saat = "Saat boş bırakılamaz.";
        if (!data.location) errors.yer = "Yer boş bırakılamaz.";
        if (fd.get("kontenjan") && (data.capacity < 1 || data.capacity > 1000)) errors.kontenjan = "1 ile 1000 arasında olmalıdır.";
        if (data.description.length === 0) errors.aciklama = "Açıklama boş bırakılamaz.";

        const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan", "aciklama"];
        alanlar.forEach(alan => {
          const input = form.elements[alan];
          const hataSpan = document.querySelector(`#${alan}-hata`);
          if (input && hataSpan) {
            if (errors[alan]) {
              input.setAttribute("aria-invalid", "true");
              input.style.border = "1px solid red";
              hataSpan.textContent = errors[alan];
              hataSpan.style.color = "red";
              hataSpan.style.display = "block";
              hataSpan.style.fontSize = "0.8rem";
              hataSpan.style.marginTop = "0.2rem";
            } else {
              input.removeAttribute("aria-invalid");
              input.style.border = "";
              hataSpan.textContent = "";
            }
          }
        });

        if (Object.keys(errors).length > 0) {
          if (formMesaj) formMesaj.innerHTML = "";
          return;
        }

        if (formMesaj) {
          formMesaj.innerHTML = `
            <div style="border: 1px solid green; padding: 1rem; color: green; margin-top: 1rem; background-color: #e6ffe6;">
              ${form.dataset.mode === "guncelle" ? "Etkinlik güncellendi (bu sprintte kaydedilmez):" : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):"}
              <pre style="color: black; background: #f4f4f4; padding: 1rem; margin-top: 0.5rem; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
            </div>
          `;
        }
      });
  }
}

