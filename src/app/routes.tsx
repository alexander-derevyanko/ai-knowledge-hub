import { createBrowserRouter, Navigate } from 'react-router';

import AppLayout from '../layout/AppLayout/AppLayout';
import DashboardPage from '../features/dashboard/DashboardPage';
import DocumentsPage from '../features/documents/DocumentsPage';
import ChatPage from '../features/chat/ChatPage';
import SettingsPage from '../features/settings/SettingsPage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', Component: DashboardPage },
      { path: 'documents', Component: DocumentsPage },
      { path: 'chat', Component: ChatPage },
      { path: 'settings', Component: SettingsPage },
    ],
  },
  { path: '*', Component: NotFoundPage },
]);
