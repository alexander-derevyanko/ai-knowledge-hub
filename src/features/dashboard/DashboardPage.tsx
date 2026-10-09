import DocumentCard from '../../components/DocumentCard/DocumentCard';
import StatCard from '../../components/StatCard/StatCard';
import { DOCUMENTS } from '../../data/documents';
import { DASHBOARD_STATS } from './dashboard.constants';
import './DashboardPage.css';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Dashboard</h1>
        <p>Welcome back, Alex</p>
      </header>

      <section className="dashboard__stats" aria-label="Statistics">
        {DASHBOARD_STATS.map(({ id, title, value }) => (
          <StatCard key={id} title={title} value={value} />
        ))}
      </section>

      <section className="dashboard__documents">
        <div className="section-header">
          <h2>Recent Documents</h2>
        </div>

        <div className="documents-list">
          {DOCUMENTS.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      </section>
    </div>
  );
}
