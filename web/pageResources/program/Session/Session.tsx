import { Session as TSession } from "../../../../types/Session";
import SectionBlock from "../../../components/SectionBlock";
import Heading from "../../../components/Heading";
import Paragraph from "../../../components/Paragraph";
import { formatDateWithTime } from "../../../util/date";

interface SessionProps {
  session: TSession;
}

export const Session = ({ session: { title, startTime, speakers } }: SessionProps) =>
  <SectionBlock key={title}>
    <Heading type="h2">{title}</Heading>
    <Paragraph>
      <span>{formatDateWithTime(startTime)}</span>
      {speakers.map(({ name, title }) => (
        <span key={name} style={{ display: "block" }}>
          <strong>{name}</strong>, {title}
        </span>
      ))}
    </Paragraph>
  </SectionBlock>
