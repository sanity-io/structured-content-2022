import Heading from '../../Heading';
import GridWrapper from '../../GridWrapper';
import TextBlock from '../TextBlock';
import styles from './QuestionAndAnswerCollection.module.css';

export const QuestionAndAnswerCollection = ({ value: { questions, _key } }) => (
  <GridWrapper>
    <div className={styles.container}>
      {questions.map(({ _key, question, answer }) => (
        <section key={_key} className={styles.section}>
          <Heading type="h3" id={`heading-h3-${_key}`}>
            {question}
          </Heading>
          <div className={styles.answer}>
            <TextBlock value={answer} />
          </div>
        </section>
      ))}
    </div>
  </GridWrapper>
);
