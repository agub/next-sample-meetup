import '../styles/globals.css';
import Layout from '..//components/layout/Layout';
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<NextNprogress
				color='#29D'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				options={{ easing: 'ease' }}
				showOnShallow={true}
			/>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
