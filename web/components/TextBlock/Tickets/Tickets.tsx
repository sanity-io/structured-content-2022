import clsx from 'clsx';
import { compareAsc, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import sub from 'date-fns/sub';
import { format } from 'date-fns-tz';
import { PortableText, PortableTextComponentProps } from '@portabletext/react';
import { Fragment } from 'react';
import type { SimpleCallToAction as TSimpleCallToAction } from '../../../types/SimpleCallToAction';
import type { Ticket, TicketGroup } from '../../../types/Ticket';
import type { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import { getCollectionForSelectionType } from '../../../util/entity';
import GridWrapper from '../../GridWrapper';
import FeatureCheckmark from '../../FeatureCheckmark';
import FeatureSection from '../../FeatureSection';
import SimpleCallToAction from '../../SimpleCallToAction';
import styles from './Tickets.module.css';

interface TicketsProps {
  type: EntitySectionSelection;
  heading: string;
  callToAction?: TSimpleCallToAction;
  allTickets: Ticket[];
  tickets?: Ticket[];
}

type AvailabilityInfo = {
  _key: string;
  price?: number;
  isExpired: boolean;
  expires?: Date;
  label?: string;
};

const availabilityData = (group: TicketGroup): AvailabilityInfo[] => {
  const currentDate = new Date();
  return group.priceAndAvailability?.map((item, index, array) => {
    const nextPriceStart = array?.[index + 1]?.from;
    const expiryTime = nextPriceStart ? parseISO(nextPriceStart) : null;
    return {
      _key: item._key,
      price: item.price,
      expires: expiryTime || undefined,
      // Check if current time is at or after the expiry time
      isExpired: Boolean(
        expiryTime && compareAsc(currentDate, expiryTime) >= 0
      ),
      label: item.label,
    };
  });
};

const expiryString = (timestamp: Date): string => {
  /* TODO: investigate if this is safe to do or if it needs to be done in a
   * way that is aware of the PST timezone, in case of daylight saving corner
   * cases
   */
  const oneDayBeforeExpiry = sub(timestamp, { days: 1 });
  const formattedDay = format(oneDayBeforeExpiry, 'MMMM d', {
    timeZone: 'PST8PDT',
    locale: enUS,
  });
  return ` (thru ${formattedDay})`;
};

const priceList = (ticket: Ticket) => (
  <ul className={styles.priceList}>
    {ticket.groups?.map((group) => {
      const currentTicket = availabilityData(group).find(
        (item) => !item.isExpired
      );
      return (
        <li key={group.name} className={styles.group}>
          {group.name && <div className={styles.groupName}>{group.name}</div>}
          {group.soldOut ? (
            <div className={styles.soldOut}>Sold out</div>
          ) : (
            <dl className={styles.priceGroup}>
              {availabilityData(group)?.map(
                ({ _key, label, price, isExpired, expires }) => (
                  <Fragment key={_key}>
                    <dt
                      className={clsx(
                        styles.priceLabel,
                        isExpired && styles.expired,
                        !label && !expires && styles.visuallyHidden,
                        currentTicket?._key === _key && styles.currentLabel
                      )}
                    >
                      {label || 'Price'}
                      {expires && expiryString(expires)}
                    </dt>
                    <dd
                      className={clsx(
                        styles.price,
                        isExpired && styles.expired,
                        currentTicket?._key === _key && styles.currentPrice
                      )}
                    >
                      {price ? `$${price}` : 'Free'}
                    </dd>
                  </Fragment>
                )
              )}
            </dl>
          )}
        </li>
      );
    })}
  </ul>
);

export const Tickets = ({
  value: { type, heading, callToAction, tickets, allTickets },
}: PortableTextComponentProps<TicketsProps>) => {
  if (!Array.isArray(allTickets) || allTickets.length === 0) {
    console.error(`Tickets missing or invalid tickets array: '${allTickets}'`);
    return null;
  }

  if (type === 'none') {
    return null;
  }

  if (type !== 'highlighted' && type !== 'all') {
    console.error(`Unrecognized Tickets type: '${type}'`);
    return null;
  }

  // GROQ has no "distinct"/"set" function
  const includedTypes = Array.from(
    new Set(allTickets.map((ticket) => ticket.included).flat())
  );

  return (
    <GridWrapper>
      <section className={styles.container}>
        {heading && <h2 className={styles.heading}>{heading}</h2>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              {getCollectionForSelectionType(type, allTickets, tickets).map(
                (ticket) => (
                  <th
                    key={ticket._id}
                    scope="col"
                    className={styles.ticketInfo}
                  >
                    <strong className={styles.name}>{ticket.type}</strong>
                    {ticket.description && (
                      <div className={styles.description}>
                        <PortableText value={ticket.description} />
                      </div>
                    )}
                    {priceList(ticket)}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {includedTypes.map((includedType) => (
              <tr key={includedType}>
                <th className={styles.feature} scope="row">
                  {includedType}
                </th>
                {getCollectionForSelectionType(type, allTickets, tickets).map(
                  (ticket) => {
                    const featureIncluded =
                      ticket.included.includes(includedType);
                    return (
                      <td
                        key={ticket._id}
                        className={clsx(
                          styles.featurePresence,
                          featureIncluded && styles.featureIncluded
                        )}
                      >
                        <FeatureCheckmark included={featureIncluded} />
                      </td>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.sections}>
          {getCollectionForSelectionType(type, allTickets, tickets).map(
            (ticket) => (
              <FeatureSection features={ticket.included} key={ticket._id}>
                <>
                  <h3 className={styles.name}>{ticket.type}</h3>
                  {ticket.description && (
                    <div className={styles.description}>
                      <PortableText value={ticket.description} />
                    </div>
                  )}
                  {priceList(ticket)}
                </>
              </FeatureSection>
            )
          )}
        </div>

        {callToAction && (
          <div className={styles.callToAction}>
            <SimpleCallToAction {...callToAction} />
          </div>
        )}
      </section>
    </GridWrapper>
  );
};
