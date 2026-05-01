import { Link } from 'react-router-dom';

export function Search() {
	return (
		<main style={{ padding: '2rem 1rem' }}>
			<section
				style={{
					maxWidth: '900px',
					margin: '0 auto',
					padding: '2rem',
					borderRadius: '16px',
					background: '#ffffff',
					boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
				}}
			>
				<p style={{ margin: 0, color: '#6b7280', fontWeight: 600 }}>Buscar</p>
				<h1 style={{ margin: '0.5rem 0 1rem', fontSize: '2rem', lineHeight: 1.1 }}>
					La búsqueda todavía está en construcción
				</h1>
				<p style={{ margin: '0 0 1.5rem', color: '#4b5563', lineHeight: 1.7 }}>
					Por ahora esta vista es una base sencilla para que el import funcione correctamente.
					Puedes seguir navegando a favoritos o al inicio mientras completas la lógica de búsqueda.
				</p>
				<Link
					to="/"
					style={{
						display: 'inline-block',
						padding: '0.75rem 1.25rem',
						borderRadius: '999px',
						textDecoration: 'none',
						background: '#111827',
						color: '#fff',
						fontWeight: 600,
					}}
				>
					Volver al inicio
				</Link>
			</section>
		</main>
	);
}

export default Search;
