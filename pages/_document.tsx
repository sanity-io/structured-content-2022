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
					<link
						rel="apple-touch-icon"
						sizes="57x57"
						href="/static/images/favicons/apple-icon-57x57.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="60x60"
						href="/static/images/favicons/apple-icon-60x60.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="72x72"
						href="/static/images/favicons/apple-icon-72x72.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="76x76"
						href="/static/images/favicons/apple-icon-76x76.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="114x114"
						href="/static/images/favicons/apple-icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="/static/images/favicons/apple-icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="144x144"
						href="/static/images/favicons/apple-icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/static/images/favicons/apple-icon-152x152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/static/images/favicons/apple-icon-180x180.png"
					/>
					<link
						rel="mask-icon"
						href="/static/images/favicons/safari-pinned-tab.svg"
						color="black"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="/static/images/favicons/android-icon-192x192.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="96x96"
						href="/static/images/favicons/favicon-96x96.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/static/images/favicons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/static/images/favicons/favicon-16x16.png"
					/>
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
