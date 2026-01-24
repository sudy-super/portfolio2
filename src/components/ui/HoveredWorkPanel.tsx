import type { Work } from '../../data/works';

interface HoveredWorkPanelProps {
  work: Work | null;
  visible: boolean;
}

export function HoveredWorkPanel({ work, visible }: HoveredWorkPanelProps) {
  if (!visible || !work) return null;

  const getLinkIcon = (linkType?: string) => {
    switch (linkType) {
      case 'github':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'huggingface':
        return (
          <svg width="16" height="16" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 95C25.1 95 5 74.9 5 50S25.1 5 50 5s45 20.1 45 45-20.1 45-45 45z" />
            <circle cx="35" cy="40" r="8" />
            <circle cx="65" cy="40" r="8" />
            <path d="M70 60c0 11-9 20-20 20s-20-9-20-20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        right: '2rem',
        color: '#1a1a1a',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '2rem',
      }}
    >
      {/* 左側: タイトルと説明 */}
      <div style={{ maxWidth: '600px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: '#666666',
              fontWeight: 500,
            }}
          >
            {work.year}
          </span>
          {work.link && (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#666666',
                pointerEvents: 'auto',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666666';
              }}
            >
              {getLinkIcon(work.linkType)}
            </a>
          )}
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {work.title}
        </h2>

        <p
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            color: '#666666',
            marginTop: '0.75rem',
            lineHeight: 1.6,
          }}
        >
          {work.shortDescription}
        </p>
      </div>

      {/* 右側: 操作ヒント */}
      <div
        style={{
          fontSize: '0.75rem',
          color: '#888888',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {work.link && <span>Click to view</span>}
      </div>
    </div>
  );
}
