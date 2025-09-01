// Хедер для навігації
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/catalog">Catalog</Link>
      </nav>
    </header>
  );
}