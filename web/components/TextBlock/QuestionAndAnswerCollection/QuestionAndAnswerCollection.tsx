import Heading from '../../Heading';
import Block from '../Block';
import GridWrapper from '../../GridWrapper';
import styles from './QuestionAndAnswerCollection.module.css';

export const QuestionAndAnswerCollection = ({ value: { questions } }) => (
  <GridWrapper>
    {questions.map(({ _key, question, answer }) => (
      <div key={_key} className={styles.question}>
        <Heading type="h3">{question}</Heading>
        {answer.map((value) => (
          <Block key={value._key} value={value} />
        ))}
      </div>
    ))}
  </GridWrapper>
);
