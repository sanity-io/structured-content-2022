import GridWrapper from '../../GridWrapper';
import TextBlock from '../TextBlock';
import styles from './QuestionAndAnswerCollection.module.css';

export const QuestionAndAnswerCollection = ({ value: { questions } }) => (
  <GridWrapper>
    <div className={styles.container}>
      {questions.map(({ _key, question, answer }) => (
        <section key={_key} className={styles.section}>
          <h3>{question}</h3>
          <div className={styles.answer}>
            <TextBlock value={answer} />
          </div>
        </section>
      ))}
    </div>
  </GridWrapper>
);
