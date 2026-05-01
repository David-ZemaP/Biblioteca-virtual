import { Link } from 'react-router-dom';

export function Home() {
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
				<p style={{ margin: 0, color: '#6b7280', fontWeight: 600 }}>Biblioteca Inteligente</p>
				<h1 style={{ margin: '0.5rem 0 1rem', fontSize: '2.25rem', lineHeight: 1.1 }}>
					Encuentra libros y guarda tus favoritos
				</h1>
				<p style={{ margin: '0 0 1.5rem', color: '#4b5563', lineHeight: 1.7 }}>
					Esta es una vista mínima para que la navegación funcione mientras completas el buscador.
					Desde aquí puedes ir a explorar libros, revisar favoritos o leer más sobre el proyecto.
				</p>
				<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
					<Link
						to="/buscar"
						style={{
							padding: '0.75rem 1.25rem',
							borderRadius: '999px',
							textDecoration: 'none',
							background: '#2563eb',
							color: '#fff',
							fontWeight: 600,
						}}
					>
						Ir a buscar
					</Link>
					<Link
						to="/favoritos"
						style={{
							padding: '0.75rem 1.25rem',
							borderRadius: '999px',
							textDecoration: 'none',
							background: '#e5e7eb',
							color: '#111827',
							fontWeight: 600,
						}}
					>
						Ver favoritos
					</Link>
				</div>
			</section>
		</main>
	);
}

export default Home;
