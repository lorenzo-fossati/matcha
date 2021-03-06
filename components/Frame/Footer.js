import { Content } from '../Content';
import { NewsletterForm } from '../NewsletterForm';
import { Markdown } from '../Markdown';
import { AssociationMark } from '../Logo';

import MenuContent from '../../contents/menu.md';
import SocialContent from '../../contents/social.md';

import {
  footerWrapper,
  newsletter,
  compliance,
  content,
  menu,
  social,
  association,
  associationMark,
} from './Frame.module.css';

export default function Footer() {
  return (
    <footer className={footerWrapper}>
      <div className={newsletter}>
        <Content>
          <NewsletterForm />
        </Content>
      </div>
      <div className={compliance}>
        <Content className={content}>
          <div className={menu}>
            <Markdown>
              <MenuContent />
            </Markdown>
          </div>
          <div className={social}>
            <Markdown>
              <SocialContent />
            </Markdown>
          </div>
          <div className={association}>
            <a href="https://imagine-zero.org/">
              <AssociationMark className={associationMark} />
            </a>
          </div>
        </Content>
      </div>
    </footer>
  );
}
