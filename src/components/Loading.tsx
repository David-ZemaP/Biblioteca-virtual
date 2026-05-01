import './Loading.scss';

interface LoadingProps {
  isSkeleton?: boolean;
}

export default function Loading({ isSkeleton = false }: LoadingProps) {
  if (isSkeleton) {
    return (
      <div className="loading-container">
        <div className="skeleton-wrapper">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-text skeleton-title"></div>
          <div className="skeleton skeleton-text skeleton-author"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text" style={{ width: '60%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
}
