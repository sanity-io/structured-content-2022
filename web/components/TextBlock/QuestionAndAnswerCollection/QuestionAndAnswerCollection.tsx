import Heading from '../../Heading';
import GridWrapper from '../../GridWrapper';
import TextBlock from '../TextBlock';
import styles from './QuestionAndAnswerCollection.module.css';

interface QuestionAndAnswerCollectionProps {
  value: {
    _key: string;
    title?: string;
    questions: {
      _key: string;
      question: string;
      answer: any;
    }[];
  };
}

export const QuestionAndAnswerCollection = ({
  value: { questions, title, _key },
}: QuestionAndAnswerCollectionProps) => (
  <GridWrapper>
    <div className={styles.container}>
      {title && (
        <h2 id={`heading-h2-${_key}`} className={styles.title}>
          {title}
        </h2>
      )}
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
