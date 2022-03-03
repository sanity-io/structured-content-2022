import Heading from '../../Heading';
import GridWrapper from '../../GridWrapper';
import styles from './QuestionAndAnswerCollection.module.css';
import TextBlock from "../TextBlock";

export const QuestionAndAnswerCollection = ({ value: { questions } }) => (
  <GridWrapper>
    <div className={styles.container}>
      {questions.map(({ _key, question, answer }) => (
        <section key={_key} className={styles.section}>
          <Heading type="h3">{question}</Heading>
          <div className={styles.answer}>
            <TextBlock value={answer} />
          </div>
        </section>
      ))}
    </div>
  </GridWrapper>
);
