import { Ticket } from '../../../types/Ticket';
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
    <>
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
                    {featureIncluded ? (
                      <div className={styles.checkmark}>&#10004;</div>
                    ) : (
                      <div className={styles.cross}>&#10008;</div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.list}>
        {tickets.map((ticket) => (
          <>
            <div
              key={ticket._id}
              className={clsx(styles.ticketInfo, styles.ticketInfoListItem)}
            >
              <div className={styles.name}>{ticket.type}</div>
              <div>
                <div>Price</div>
                <div className={styles.price}>
                  {ticket.price ? `$${ticket.price}` : 'Free'}
                </div>
              </div>
            </div>
            <ul className={styles.ticketFeaturesListItem}>
              {ticket.included.map((included) => (
                <li key={included} className={styles.includedFeature}>
                  <span className={styles.checkmark}>&#10004;</span>
                  <span className={styles.includedFeatureDescription}>
                    {included}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
    </>
  );
};
