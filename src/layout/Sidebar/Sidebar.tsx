import './Sidebar.css';
import NavigationItem from '../../components/NavigationItem/NavigationItem';

// TODO: move to the shared
export interface SidebarItem {
  name: string;
  path: string;
  icon: string;
}

const SIDEBAR_CONFIG: SidebarItem[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: '',
  },
  {
    name: 'Documents',
    path: '/documents',
    icon: '',
  },
  {
    name: 'AI Chat',
    path: '/chat',
    icon: '',
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {SIDEBAR_CONFIG.map((item) => (
          <NavigationItem key={item.path} {...item} />
        ))}
      </nav>
    </aside>
  );
}
