import { useEffect, useRef, useState } from 'react';
import './UserMenu.css';

const App = () => {
console.log();
return <div className="app">Hello world</div>
}

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e: Event) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="user-menu__avatar">A</span>
        <span className="user-menu__name">Alex</span>

        <svg
          className={`user-menu__chevron ${isOpen ? 'user-menu__chevron--open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="user-menu__dropdown" role="menu">
          <div className="user-menu__profile">
            <span className="user-menu__avatar user-menu__avatar--large">A</span>

            <div className="user-menu__profile-info">
              <strong>Alex</strong>
              <span>alex@example.com</span>
            </div>
          </div>

          <div className="user-menu__divider" />

          <a href="/profile" className="user-menu__item" role="menuitem">
            <span>Profile</span>
          </a>

          <a href="/settings" className="user-menu__item" role="menuitem">
            <span>Settings</span>
          </a>

          <div className="user-menu__divider" />

          <button
            type="button"
            className="user-menu__item user-menu__item--danger"
            role="menuitem"
            onClick={() => {
              console.log('Logout');
              setIsOpen(false);
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
