import { Outlet } from 'react-router';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

export default function AppLayout() {
  return (
    <>
      <Header />

      <div className="page-layout">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
