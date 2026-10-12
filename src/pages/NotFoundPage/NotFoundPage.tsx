import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <header className="not-found__header">
        <a href="/" className="not-found__brand">
          AI Knowledge Hub
        </a>
      </header>

      <main className="not-found__main">
        <section className="not-found__content">
          <div className="not-found__eyebrow">
            <span className="not-found__status-dot" />
            ERROR 404
          </div>

          <div className="not-found__illustration" aria-hidden="true">
            <div className="not-found__orbit not-found__orbit--one" />
            <div className="not-found__orbit not-found__orbit--two" />

            <div className="not-found__document">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 8H37L49 20V53C49 55.2 47.2 57 45 57H18C15.8 57 14 55.2 14 53V12C14 9.8 15.8 8 18 8Z"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M36 9V22H48"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M23 32H40M23 40H36"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path d="M25 48H32" stroke="#5145F5" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>

            <span className="not-found__floating not-found__floating--top">?</span>
            <span className="not-found__floating not-found__floating--bottom">
              <span />
              <span />
              <span />
            </span>
          </div>

          <h1 className="not-found__code">404</h1>

          <h2 className="not-found__title">
            Looks like this page
            <br />
            <span>is missing.</span>
          </h2>

          <p className="not-found__description">
            We couldn't find the page you're looking for. It may have been moved, deleted, or never
            existed.
          </p>

          <div className="not-found__actions">
            <a href="/" className="not-found__button">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Dashboard
            </a>

            <button
              type="button"
              className="not-found__back-button"
              onClick={() => window.history.back()}
            >
              Go back
            </button>
          </div>

          <div className="not-found__hint">
            <div className="not-found__hint-icon">i</div>
            <span>Your knowledge is safe. Only this page is missing.</span>
          </div>
        </section>

        <footer className="not-found__footer">
          <span>AI Knowledge Hub</span>
          <span>Knowledge is always within reach.</span>
        </footer>
      </main>
    </div>
  );
}
