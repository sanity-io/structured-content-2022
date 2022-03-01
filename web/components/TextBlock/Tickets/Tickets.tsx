import clsx from 'clsx';
import { compareAsc, parseISO } from 'date-fns';
import { PortableText, PortableTextComponentProps } from '@portabletext/react';
import { Fragment } from 'react';
import checkmarkIcon from '../../../images/checkmark.svg';
import crossIcon from '../../../images/cross.svg';
import { Ticket } from '../../../types/Ticket';
import GridWrapper from '../../GridWrapper';
import { EntitySectionSelection } from '../../../types/EntitySectionSelection';
import styles from './Tickets.module.css';

interface TicketsProps {
  type: EntitySectionSelection;
  allTickets: Ticket[];
  tickets?: Ticket[];
}

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

  const currentPriceAndAvailability = (ticket: Ticket) =>
    ticket.priceAndAvailability?.reduce((acc, current) => {
      const fromDate = parseISO(current.from);
      const currentDate = new Date();
      // Check if current date is before the from date
      if (compareAsc(currentDate, fromDate) == 1) {
        return current;
      }
      return acc;
    }, ticket.priceAndAvailability[0]);

  return (
    <GridWrapper>
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            {(tickets || allTickets).map((ticket) => {
              const currentPrice = currentPriceAndAvailability(ticket);
              return (
                <th key={ticket._id} scope="col" className={styles.ticketInfo}>
                  <div className={styles.name}>{ticket.type}</div>
                  {ticket.description && (
                    <div className={styles.description}>
                      <PortableText value={ticket.description} />
                    </div>
                  )}
                  <dl className={styles.priceList}>
                    {ticket.priceAndAvailability.map(
                      ({ _key, label, price }) => (
                        <Fragment key={_key}>
                          <dt className={styles.priceLabel}>
                            Price {label ? `(${label})` : null}
                          </dt>
                          {currentPrice._key == _key ? (
                            <dd className={clsx(styles.price, styles.current)}>
                              <strong>{price ? `$${price}` : 'Free'}</strong>
                            </dd>
                          ) : (
                            <dd className={styles.price}>
                              {price ? `$${price}` : 'Free'}
                            </dd>
                          )}
                        </Fragment>
                      )
                    )}
                  </dl>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {includedTypes.map((includedType) => (
            <tr key={includedType}>
              <th className={styles.feature} scope="row">
                {includedType}
              </th>
              {(tickets || allTickets).map((ticket) => {
                const featureIncluded = ticket.included.includes(includedType);
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
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.sections}>
        {(tickets || allTickets).map((ticket) => {
          const currentPrice = currentPriceAndAvailability(ticket);
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
                  {ticket.priceAndAvailability.map(({ _key, label, price }) => (
                    <Fragment key={_key}>
                      <dt className={styles.priceLabel}>
                        Price {label ? `(${label})` : null}
                      </dt>
                      {currentPrice._key == _key ? (
                        <dd className={clsx(styles.price, styles.current)}>
                          <strong>{price ? `$${price}` : 'Free'}</strong>
                        </dd>
                      ) : (
                        <dd className={styles.price}>
                          {price ? `$${price}` : 'Free'}
                        </dd>
                      )}
                    </Fragment>
                  ))}
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
        })}
      </div>
    </GridWrapper>
  );
};
