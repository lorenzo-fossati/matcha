import { useTracking } from '../../hooks';

import { Headline, Subline } from '../Typo';

import {
  wrapper,
  contentWrapper,
  actionWrapper,
  headline,
  subline,
  button,
} from './ActivityCard.module.css';

const Button = ({ link, label }) => {
  const { trackOutboundLink } = useTracking();
  return (
    <a
      className={button}
      href={link}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackOutboundLink(link)}
    >
      {label}
    </a>
  );
};

export default function ActivityCard({ activity }) {
  const {
    name,
    slug,
    description,
    singleWordCta,
    link,
    organization: org,
  } = activity;
  return (
    <div className={wrapper} key={slug}>
      <div className={contentWrapper}>
        <Subline className={subline}>{org.name}</Subline>
        <Headline className={headline}>{name}</Headline>
        <p>{description}</p>
      </div>
      <div className={actionWrapper}>
        <Button link={link} label={singleWordCta} />
      </div>
    </div>
  );
}
