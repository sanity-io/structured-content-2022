import Head from 'next/head';
import CheckMark from '../components/checkMark';
import HeroIllustration from '../components/heroIllustration';
import Logo from '../components/logo';

const tagLine = `Where business, content, design, and engineering meet`;

const locations = [
	'Online',
	'San Francisco',
	'Oslo',
	'Amsterdam',
	'London',
	'New York City',
];

const bulletPoints = [
	'Practical workshops for developers, strategists, and content owners',
	'Single-track sessions that bring together all the disciplines involved in making connected content',
	'Discussions with people who are working through similar challenges and people who have found ways to overcome them',
	'Good food, good company',
];

const defaultPaddingX = 'px-4 sm:px-6 md:px-8';

export default function Home() {
	return (
		<>
			<Head>
				<title>Structured Content 2022</title>
				<meta name="description" content={tagLine} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<section
					className={`pt-10 pb-12 sm:py-20 bg-blue-50 ${defaultPaddingX}`}
				>
					<div className="flex flex-col md:max-w-[52rem] mx-auto gap-y-8">
						<div className="flex items-center justify-between">
							<div className="md:max-w-md">
								<a
									href="https://www.sanity.io?utm_source=structured-content-2022&utm_medium=website&utm_campaign=conference"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Logo className="w-16 text-red-500" />
								</a>
								<h1 className="py-4 text-5xl font-semibold text-blue-900 sm:py-6 sm:text-6xl font-larsseit">
									Structured content <span className="text-blue-400">2022</span>
								</h1>
								<p className="text-xl font-semibold text-blue-900 sm:text-2xl">
									{tagLine}
								</p>
							</div>
							<HeroIllustration className="w-[22rem] hidden sm:block" />
						</div>
						<div className="flex flex-col text-xl gap-y-2 sm:text-2xl">
							<p className="text-blue-400">May 24-25, 2002</p>
							<p className="text-blue-900">{locations.join(' • ')}</p>
						</div>
						<hr className="h-px bg-blue-900 border-0" />
						<div>
							<h2 className="mb-4 text-xl font-medium text-blue-900 sm:text-2xl">
								Get early access
							</h2>
							<form>
								<label htmlFor="email" className="hidden mb-2 sm:block">
									Email address
								</label>
								<div className="flex flex-col space-x-0 space-y-3 sm:space-y-0 sm:space-x-2 sm:flex-row">
									<input
										name="email"
										type="email"
										placeholder="Email address"
										required
										className="py-3 placeholder-blue-900 bg-blue-100 border-blue-900 sm:placeholder-opacity-0 sm:w-80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 "
									/>
									<button
										type="submit"
										className="px-5 py-3 font-semibold text-white bg-blue-400 border border-blue-400 hover:border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
									>
										Sign up
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>

				<section className={`relative bg-red-50 ${defaultPaddingX}`}>
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: 'url(/static/images/background.svg)',
							backgroundSize: '100% 100%',
						}}
					></div>
					<div className="flex flex-col max-w-[52rem] mx-auto gap-y-12 sm:pt-12 pt-10 sm:pb-20 pb-12">
						<div className="max-w-[28rem] mx-auto space-y-4 sm:text-lg text-red-900">
							<p>
								Sanity is not a typical web content management system.{' '}
								<span className="text-red-500">Structured Content 2022</span>{' '}
								will not be a typical developer conference.
							</p>
							<p>
								It will be a place to connect with people who are putting
								connected content into practice from all sides—marketing,
								engineering, customer experience, product management, content
								strategy, design systems, line of business leadership.
							</p>
						</div>
						<hr className="h-px bg-red-300 border-0" />
						<div className="max-w-[28rem] mx-auto">
							<h2 className="mb-8 text-2xl font-bold text-center text-red-900 sm:mb-12 sm:text-3xl font-larsseit">
								What to expect
							</h2>
							<div className="space-y-4 md:pr-6">
								{bulletPoints.map((point) => (
									<div className="flex gap-x-2">
										<CheckMark className="flex-none w-4 h-4 mt-1.5" />
										<p className="text-red-900 sm:text-lg">{point}</p>
									</div>
								))}
							</div>
						</div>
						<hr className="h-px bg-red-300 border-0" />
						<div className="space-y-4 sm:text-lg text-red-900 max-w-[28rem] mx-auto">
							<p>
								Strategists and business stakeholders will learn something about
								the technology that enables them to meet their objectives.
								Developers and designers will learn about mapping their work to
								business goals and user needs.
							</p>
							<p>
								Together we will talk about the problem, learn about how some
								organizations are working on solving it, and build a community
								to support you in continuing to do the work.
							</p>
							<p className="font-bold">
								Expect to be inspired, connected, and a little smarter when you
								get back to work.
							</p>
						</div>
					</div>
				</section>
			</main>
			<footer className={`py-16 bg-blue-900 sm:py-24 ${defaultPaddingX}`}>
				<div className="max-w-[52rem] mx-auto space-y-3">
					<a
						href="https://www.sanity.io?utm_source=structured-content-2022&utm_medium=website&utm_campaign=conference"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Logo className="w-16 text-white" />
					</a>
					<p className="text-sm text-blue-50">
						The Structured Content Conference is a Sanity, Inc. event. © Sanity,
						Inc. {new Date().getFullYear()}. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}
