import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
	public static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
		};
	}

	public render(): JSX.Element {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content="#E8F1FE" />
					<link
						rel="preload"
						href="/static/fonts/inter-var-latin.woff2"
						as="font"
						type="font/woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						href="/static/fonts/larsseit-bold.woff2"
						as="font"
						type="font/woff"
						crossOrigin="anonymous"
					/>
					<Script
						src={'https://api.sanity.io/v1/snowflake/cookieconsent.min.js'}
						strategy="lazyOnload"
					/>
					{/* TODO: Add favicons */}
				</Head>
				<body className="min-h-screen font-sans antialiased bg-blue-50">
					<div id="cookieConsentContainer"></div>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
