const enum DashboardStats {
  Documents = 'documents',
  Questions = 'questions',
  Storage = 'storage',
}

export const DASHBOARD_STATS = [
  {
    id: DashboardStats.Documents,
    title: 'Documents',
    value: 128,
  },
  {
    id: DashboardStats.Questions,
    title: 'Questions',
    value: 42,
  },
  {
    id: DashboardStats.Questions,
    title: 'Storage',
    value: '2.4 GB',
  },
];
