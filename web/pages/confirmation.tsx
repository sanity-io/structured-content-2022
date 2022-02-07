import Head from 'next/head';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Logo from '../components/logo';

const Confirmation = () => {
  // Event metadata
  const title = 'Structured Content 2022';
  const description =
    'Where business, content, design, and engineering meet.\n\nSee https://structuredcontent.live for updated info.';
  const location =
    'Online • San Francisco • Oslo • Amsterdam • London • New York City';
  const url = 'https://structuredcontent.live';

  // Google Calendar
  const generateGcalUrl = () => {
    const gcalUrl = new URL('https://www.google.com/calendar/event');
    gcalUrl.searchParams.append('action', 'TEMPLATE');
    gcalUrl.searchParams.append('text', title);
    gcalUrl.searchParams.append('details', description);
    gcalUrl.searchParams.append('location', location);
    gcalUrl.searchParams.append('url', url);
    gcalUrl.searchParams.append('dates', '20220524/20220526');
    return gcalUrl.href;
  };

  // ICS
  const generateIcsBlob = () => {
    const blob = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'DTSTART;VALUE=DATE:' + '20220524',
      'DTEND;VALUE=DATE:' + '20220526',
      'SUMMARY:' + title,
      'DESCRIPTION:' + description,
      'LOCATION:' + location,
      'URL:' + url,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    return encodeURI('data:text/calendar;charset=utf8,' + blob);
  };

  return (
    <>
      <Head>
        <title>Confirmation – Structured Content 2022</title>
      </Head>
      <div className="flex flex-col items-center px-4 pt-4 mx-auto align-middle sm:max-w-xl sm:pt-16">
        <div className="flex flex-col p-8 text-center bg-white border gap-y-6 border-blue-900/10">
          <h1 className="mt-6 text-3xl font-bold text-blue-900 sm:text-4xl font-larsseit">
            You&apos;re on the list!
          </h1>
          <div className="space-y-4 text-lg text-center text-blue-900">
            <p>
              We are busy getting everything together for this first-of-a-kind
              event and will let you know the details as soon as they are
              available.
            </p>
            <p>
              In the meantime, you can get up to speed on{' '}
              <a
                href="https://www.sanity.io?utm_source=structured-content-2022&utm_medium=website&utm_campaign=conference"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 hover:text-blue-600"
              >
                structured content
              </a>
              , and add the event to your calendar:
            </p>
          </div>
          <Menu as="div" className="relative block sm:mx-auto">
            <Menu.Button className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition ease-out bg-blue-400 sm:w-auto hover:bg-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Add to calendar
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute w-full mt-2 origin-top bg-white border border-blue-900 divide-y divide-blue-900 shadow focus:outline-none">
                <div className="p-2">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active
                            ? 'bg-blue-300/10 text-blue-900'
                            : 'text-blue-950'
                        } flex items-center w-full px-3 py-2 justify-center`}
                        href={generateGcalUrl()}
                        target="_blank"
                      >
                        Google Calendar
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-2">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active
                            ? 'bg-blue-300/10 text-blue-900'
                            : 'text-blue-950'
                        } flex items-center w-full px-3 py-2 justify-center`}
                        href={generateIcsBlob()}
                        download="structured-content-2022.ics"
                        target="_blank"
                      >
                        Apple Calendar
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="p-2">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active
                            ? 'bg-blue-300/10 text-blue-900'
                            : 'text-blue-950'
                        } flex items-center w-full px-3 py-2 justify-center`}
                        href={generateIcsBlob()}
                        download="structured-content-2022.ics"
                        target="_blank"
                      >
                        Outlook
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <a
            href="/"
            className="font-medium text-gray-600 sm:mx-auto hover:text-blue-900"
          >
            ← Go back
          </a>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
