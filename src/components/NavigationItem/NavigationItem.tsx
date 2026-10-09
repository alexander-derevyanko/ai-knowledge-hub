import { NavLink } from 'react-router';
import type { SidebarItem } from '../../layout/Sidebar/Sidebar';

export default function NavigationItem({ icon, name, path }: SidebarItem) {
  return (
    <NavLink to={path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
      <img src={icon} alt={name} className="nav-icon" />
      <span>{name}</span>
    </NavLink>
  );
}
