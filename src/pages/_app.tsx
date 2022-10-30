import '../styles/globals.css'
import '../styles/itemicon.css'
import Layout from "../components/Layout/Layout"
import StaticProvider from "../data/StaticProvider";


import type { AppType } from 'next/app';
import { trpc } from '@/utils/trpc';
const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<StaticProvider>
			<Layout>
				<Component {...pageProps}/>
			</Layout>
		</StaticProvider>
	)
};
export default trpc.withTRPC(MyApp);
