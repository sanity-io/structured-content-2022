import Head from "next/head";
import Image from "next/image";
import Graphic from "../components/graphic";
import Logo from "../components/logo";

const tagLine = `Where business, content, design, and engineering meet`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Structured Content 2022</title>
        <meta name="description" content={tagLine} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-sans bg-blue-50">
        {/* Hero */}
        <div className="flex items-center pt-16 px-16 md:px-64">
          <section className="bg-blue-50">
            <Logo />
            <h1 className="text-blue-900 text-5xl font-bold mb-8">
              Structured Content <span className="text-blue-400">2022</span>
            </h1>
            <p>{tagLine}</p>
          </section>
          <Graphic />
        </div>
        {/* Date and location */}
        <section className="bg-blue-50 mb-8 px-16 md:px-64">
          <h2 className="text-blue-400 mb-2">May 24–25th, 2022</h2>
          <ul className="flex gap-5 list-disc list-inside">
            <li className="list-none">Online</li>
            <li>San Francisco</li>
            <li>Oslo</li>
            <li>Amsterdam</li>
            <li>London</li>
            <li>New York City</li>
          </ul>
          <hr className=" mb-8" />
          {/* Sign up to MailChimp early access */}
          <h2 className="text-blue-900 mb-4">Get early access</h2>
          <form>
            <label htmlFor="email" className="text-sm block">
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="border-blue-900 bg-blue-100 border-2 p-2 w-1/2 md:w-1/3 mr-2"
            />
            <button type="submit" className="bg-blue-400 text-white p-2">
              Sign up
            </button>
          </form>
        </section>
        {/* Pitch */}
        <section className="bg-red-50 py-8 px-64 md:px-96">
          <p>
            Sanity is not a typical web content management system.{" "}
            <span>Structured Content 2022</span> will not be a typical developer
            conference.
          </p>
          <p>
            It will be a place to connect with people who are putting connected
            content into practice from all sides—marketing, engineering,
            customer experience, product management, content strategy, design
            systems, line of business leadership.
          </p>
        </section>
        <hr className="text-red-200 mx-24" />
        {/* What to expect */}
        <section className="bg-red-50 py-8 px-64 md:px-96">
          <h2 className="text-center text-xl font-bold mb-8">What to expect</h2>
          <ul>
            <li className="pb-4">
              Practical workshops for developers, strategists, and content
              owners
            </li>
            <li className="pb-4">
              Single-track sessions that bring together all the disciplines
              involved in making connected content
            </li>
            <li className="pb-4">
              Discussions with people who are working through similar challenges
              and people who have found ways to overcome them
            </li>
            <li className="pb-4">Good food, good company</li>
          </ul>
        </section>
        <hr className="text-red-200 mx-24" />
        {/* What to expect */}
        <section className="bg-red-50 py-8 px-64 md:px-96">
          <p>
            Strategists and business stakeholders will learn something about the
            technology that enables them to meet their objectives. Developers
            and designers will learn about mapping their work to business goals
            and user needs.
          </p>
          <p>
            Together we will talk about the problem, learn about how some
            organizations are working on solving it, and build a community to
            support you in continuing to do the work.
          </p>
          <p>
            <strong>
              Expect to be inspired, connected, and a little smarter when you
              get back to work.
            </strong>
          </p>
        </section>
      </main>

      <footer className="bg-blue-900 text-white p-64">
        <a
          href="https://www.sanity.io?utm_source=structured-content-2022&utm_medium=website&utm_campaign=conference"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Logo />
        </a>
        <p>
          The Structured Content Conference is a Sanity, Inc. event. © Sanity,
          Inc. {new Date().getFullYear()}. All rights reserved.
        </p>
      </footer>
    </>
  );
}
