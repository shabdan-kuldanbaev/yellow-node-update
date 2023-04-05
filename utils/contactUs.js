import dotenv from 'dotenv';
import MailchimpTransactional from '@mailchimp/mailchimp_transactional';
import { CONTACTS_DATA } from './constants';
import { handleError } from './error';

dotenv.config('./env');

const client = MailchimpTransactional(process.env.MAILCHIMP_TRANSACTIONAL_API_KEY);

export async function sendAutoReplyEmail(email) {
  try {
    const response = await client.messages.sendTemplate({
      async: true,
      template_name: 'Test template',
      template_content: [],
      message: {
        to: [{ email }],
        from_email: CONTACTS_DATA.email,
        from_name: 'Yellow Systems',
        subject: 'Thanks for contacting Yellow Systems!',
      },
    });

    if (response[0].status !== 'sent') {
      handleError({
        error: `Sent Error: email: ${email}, 
                status: ${response[0].status}, 
                reason: ${response[0].reject_reason || response[0].queued_reason}`,
      });
    }
  } catch (e) {
    handleError(e);
  }
}
