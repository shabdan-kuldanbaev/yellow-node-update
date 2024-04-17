import { NextResponse } from 'next/server';
import { sendFormData } from 'utils/formDataHelper';
import { sendDataPipedrive } from 'utils/pipedrive/pipedriveHelper';
import { sendAutoReplyEmail } from 'utils/contactUs';
import { headers } from 'next/headers';

export async function POST(request) {
  try {
    const head = headers();
    const formData = await request.formData();
    const ip = head.get('x-forwarded-for');

    const fields = {
      ip,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      description: formData.get('description'),
      projectBudget: formData.get('projectBudget'),
      attachments: formData.get('attachments'),
      clientId: formData.get('clientId'),
    };

    await sendAutoReplyEmail(fields.email);
    await sendFormData(fields);
    await sendDataPipedrive(fields);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json('error', { status: 500 });
  }
}
