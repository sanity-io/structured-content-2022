import { Ticket } from '../../../types/Ticket';
import GridWrapper from '../../GridWrapper';
import checkmarkIcon from '../../../images/checkmark.svg';
import crossIcon from '../../../images/cross.svg';
import styles from './Tickets.module.css';
import clsx from 'clsx';

interface TicketsProps {
  value: {
    type: 'all';
    tickets: Ticket[];
  };
}

export const Tickets = ({ value: { type, tickets } }: TicketsProps) => {
  if (type !== 'all') {
    console.error(`Unrecognized SponsorsSection type: '${type}'`);
    return null;
  }

  if (!Array.isArray(tickets) || tickets.length === 0) {
    console.error(`Tickets missing or invalid tickets array: '${tickets}'`);
    return null;
  }

  // GROQ has no "distinct"/"set" function
  const includedTypes = Array.from(
    new Set(tickets.map((ticket) => ticket.included).flat())
  );
  return (
    <GridWrapper>
      <table className={styles.table}>
        <thead>
          <tr>
            <td />
            {tickets.map((ticket) => (
              <td
                key={ticket._id}
                className={clsx(styles.ticketInfo, styles.ticketInfoColumn)}
              >
                <div className={styles.name}>{ticket.type}</div>
                <div>
                  <div>Price</div>
                  <div className={styles.price}>
                    {ticket.price ? `$${ticket.price}` : 'Free'}
                  </div>
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {includedTypes.map((includedType) => (
            <tr key={includedType}>
              <td className={styles.feature}>{includedType}</td>
              {tickets.map((ticket) => {
                const featureIncluded = ticket.included.includes(includedType);
                return (
                  <td
                    key={ticket._id}
                    className={clsx(
                      styles.feature,
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
        {tickets.map((ticket) => (
          <section key={ticket._id}>
            <div className={clsx(styles.ticketInfo, styles.ticketInfoListItem)}>
              <h3 className={styles.name}>{ticket.type}</h3>
              <dl className={styles.priceList}>
                <dt className={styles.priceLabel}>Price</dt>
                <dd className={styles.price}>
                  {ticket.price ? `$${ticket.price}` : 'Free'}
                </dd>
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
        ))}
      </div>
    </GridWrapper>
  );
};
