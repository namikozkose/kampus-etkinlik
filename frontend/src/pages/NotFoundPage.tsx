import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link className="buton-link" to="/">
        Ana sayfaya dön
      </Link>
    </section>
  );
}

export default NotFoundPage;
