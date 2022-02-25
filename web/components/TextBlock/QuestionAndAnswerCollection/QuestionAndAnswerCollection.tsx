import Heading from '../../Heading';
import Block from '../Block';
import GridWrapper from '../../GridWrapper';
import styles from './QuestionAndAnswerCollection.module.css';

export const QuestionAndAnswerCollection = ({ value: { questions } }) => (
  <GridWrapper>
    <div className={styles.container}>
      {questions.map(({ _key, question, answer }) => (
        <section key={_key} className={styles.section}>
          <Heading type="h3">{question}</Heading>
          <div className={styles.answer}>
            {answer.map((value) => (
              <Block key={value._key} value={value} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </GridWrapper>
);
