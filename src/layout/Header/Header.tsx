import UserMenu from '../../components/UserMenu/UserMenu';
import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <h4>
        <a href="/" className="logo">
          AI Knowledge Hub
        </a>
      </h4>

      <UserMenu />
    </header>
  );
}
