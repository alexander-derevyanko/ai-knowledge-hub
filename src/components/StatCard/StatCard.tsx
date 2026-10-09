import './StatCard.css';

type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <article className="stats-card">
      <div className="stats-card__title">{title}</div>

      <div className="stats-card__value">{value}</div>
    </article>
  );
}
