import Heading from '../../Heading';
import Block from '../Block';
import SectionBlock from '../../SectionBlock';
import styles from './QuestionAndAnswerCollection.module.css';

export const QuestionAndAnswerCollection = ({
  value: { questions, title },
}) => (
  <SectionBlock>
    <Heading type="h2">{title}</Heading>
    {questions.map(({ _key, question, answer }) => (
      <div key={_key} className={styles.question}>
        <Heading type="h3">{question}</Heading>
        {answer.map((value) => (
          <Block key={value._key} value={value} />
        ))}
      </div>
    ))}
  </SectionBlock>
);
