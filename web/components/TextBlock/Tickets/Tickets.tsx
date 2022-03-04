import clsx from 'clsx';
import { compareAsc, parseISO } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import sub from 'date-fns/sub';
import { format } from 'date-fns-tz';
import { PortableText, PortableTextComponentProps } from '@portabletext/react';
import { Fragment } from 'react';
import checkmarkIcon from '../../../images/checkmark.svg';
import crossIcon from '../../../images/cross.svg';
import { Ticket } from '../../../types/Ticket';
import GridWrapper from '../../GridWrapper';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import styles from './Tickets.module.css';
import { getCollectionForSelectionType } from '../../../util/entity';

interface TicketsProps {
  type: EntitySectionSelection;
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

export const Tickets = ({
  value: { type, tickets, allTickets },
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

  const availabilityData = (ticket: Ticket): AvailabilityInfo[] => {
    const currentDate = new Date();
    return ticket.priceAndAvailability?.map((item, index, array) => {
      const nextPriceStart = array?.[index + 1]?.from;
      const expiryTime = nextPriceStart ? parseISO(nextPriceStart) : null;
      return {
        _key: item._key,
        price: item.price,
        expires: expiryTime,
        // Check if current time is at or after the expiry time
        isExpired: expiryTime && compareAsc(currentDate, expiryTime) >= 0,
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

  return (
    <GridWrapper>
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            {getCollectionForSelectionType(type, allTickets, tickets).map(
              (ticket) => {
                return (
                  <th
                    key={ticket._id}
                    scope="col"
                    className={styles.ticketInfo}
                  >
                    <div className={styles.name}>{ticket.type}</div>
                    {ticket.description && (
                      <div className={styles.description}>
                        <PortableText value={ticket.description} />
                      </div>
                    )}
                    <dl className={styles.priceList}>
                      {availabilityData(ticket)?.map(
                        ({ _key, label, price, isExpired, expires }) => (
                          <Fragment key={_key}>
                            <dt className={styles.priceLabel}>
                              {label || (
                                <span className={styles.visuallyHidden}>
                                  Price
                                </span>
                              )}
                              {expires && expiryString(expires)}
                            </dt>
                            {isExpired ? (
                              <dd
                                className={clsx(styles.price, styles.expired)}
                              >
                                {price ? `$${price}` : 'Free'}
                              </dd>
                            ) : (
                              <dd className={styles.price}>
                                <strong>{price ? `$${price}` : 'Free'}</strong>
                              </dd>
                            )}
                          </Fragment>
                        )
                      )}
                    </dl>
                  </th>
                );
              }
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
                      {/* eslint-disable @next/next/no-img-element */}
                      {featureIncluded ? (
                        <img
                          src={checkmarkIcon.src}
                          className={styles.icon}
                          width={checkmarkIcon.width}
                          height={checkmarkIcon.height}
                          alt="Included"
                        />
                      ) : (
                        <img
                          src={crossIcon.src}
                          className={styles.icon}
                          width={crossIcon.width}
                          height={crossIcon.height}
                          alt="Not included"
                        />
                      )}
                      {/* eslint-enable @next/next/no-img-element */}
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
          (ticket) => {
            return (
              <section key={ticket._id}>
                <div className={clsx(styles.ticketInfo, styles.inSections)}>
                  <h3 className={styles.name}>{ticket.type}</h3>
                  {ticket.description && (
                    <div className={styles.description}>
                      <PortableText value={ticket.description} />
                    </div>
                  )}
                  <dl className={styles.priceList}>
                    {availabilityData(ticket)?.map(
                      ({ _key, label, price, isExpired, expires }) => (
                        <Fragment key={_key}>
                          <dt className={styles.priceLabel}>
                            {label || (
                              <span className={styles.visuallyHidden}>
                                Price
                              </span>
                            )}
                            {expires && expiryString(expires)}
                          </dt>
                          {isExpired ? (
                            <dd className={clsx(styles.price, styles.expired)}>
                              {price ? `$${price}` : 'Free'}
                            </dd>
                          ) : (
                            <dd className={styles.price}>
                              <strong>{price ? `$${price}` : 'Free'}</strong>
                            </dd>
                          )}
                        </Fragment>
                      )
                    )}
                  </dl>
                </div>
                <ul className={styles.ticketFeatures}>
                  {ticket.included.map((included) => (
                    <li key={included} className={styles.includedFeature}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={checkmarkIcon.src}
                        className={styles.icon}
                        width={checkmarkIcon.width}
                        height={checkmarkIcon.height}
                        alt=""
                      />
                      <span className={styles.includedFeatureDescription}>
                        {included}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }
        )}
      </div>
    </GridWrapper>
  );
};
