import { NextResponse } from 'next/server';
import { sendFormData } from 'utils/formDataHelper';
import { sendDataPipedrive } from 'utils/pipedrive/pipedriveHelper';
import { sendAutoReplyEmail } from 'utils/contactUs';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);

    await sendAutoReplyEmail(body.email);
    await sendFormData(request, body);
    const newPersonPipedrive = await sendDataPipedrive(request, body);

    return NextResponse.json({ success: true, newPersonPipedrive });
  } catch (error) {
    console.error(error);

    return NextResponse.json('error', { status: 500 });
  }
}
