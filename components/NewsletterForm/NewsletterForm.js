import { useLogin, useTracking, useTranslation } from '../../hooks';

import {
  formWrapper,
  inputWrapper,
  paragraph,
  emailInput,
  hiddenField,
  submitButton,
} from './NewsletterForm.module.css';

const mailchimpUrl =
  'https://imagine-zero.us10.list-manage.com/subscribe/post?u=470788f15c170e69d1a3ef0e5&amp;id=7b5132350f';

export default function NewsletterForm() {
  const { profile } = useLogin();
  const { trackEvent } = useTracking();
  const { t } = useTranslation();
  return (
    <form action={mailchimpUrl} method="post" target="_blank">
      <div className={formWrapper}>
        <p className={paragraph}>{t('nlSubscriptionDescription')}</p>
        <div className={inputWrapper}>
          <input
            type="email"
            defaultValue={profile ? profile.email : ''}
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="deine@adresse.de"
            autoComplete="off"
            required
            className={emailInput}
          />
          <input
            type="text"
            name="b_470788f15c170e69d1a3ef0e5_7b5132350f"
            tabIndex="-1"
            defaultValue=""
            className={hiddenField}
            aria-hidden="true"
          />
          <input
            type="submit"
            value={t('nlSubscriptionButton')}
            name="subscribe"
            className={submitButton}
            onClick={() => trackEvent('sign_up', { method: 'MailChimp' })}
          />
        </div>
      </div>
    </form>
  );
}
