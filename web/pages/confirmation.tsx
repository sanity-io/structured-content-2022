import Head from 'next/head';
import React from 'react';

const Confirmation = () => {
	return (
		<>
			<Head>
				<title>Confirmation – Structured Content 2022</title>
			</Head>
			<div className="flex flex-col items-center px-4 py-4 mx-auto align-middle sm:max-w-lg sm:py-32">
				<div className="flex flex-col p-8 text-center border gap-y-8 border-blue-900/10">
					<h1 className="text-3xl font-bold text-blue-900 sm:text-4xl font-larsseit">
						You&apos;re on the list!
					</h1>
					<p className="text-lg text-center text-blue-900 sm:text-xl">
						We are busy getting everything together for this first-of-a-kind
						event and will let you know the details as soon as they are
						available.
					</p>
					<a
						href="/"
						className="px-5 py-3 font-semibold text-white bg-blue-400 border border-blue-400 rounded-none hover:border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
					>
						← Go back
					</a>
				</div>
			</div>
		</>
	);
};

export default Confirmation;
