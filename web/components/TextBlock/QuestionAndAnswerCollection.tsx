import Heading from '../Heading';
import { Block } from './Block';

export const QuestionAndAnswerCollection = ({
  value: { questions, title },
}) => (
  <>
    <Heading type="h2">{title}</Heading>
    {questions.map(({ _key, question, answer }) => (
      <div key={_key}>
        <Heading type="h3">{question}</Heading>
        {answer.map((value) => (
          <Block key={value._key} value={value} />
        ))}
      </div>
    ))}
  </>
);
