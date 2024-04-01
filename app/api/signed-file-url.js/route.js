import { NextResponse } from 'next/server';
import axios from 'axios';
import { handleApiError } from 'utils/error';

const authToken = process.env.ERP_AUTH_TOKEN || '';

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  try {
    const {
      data: { signed_url },
    } = await axios.post(
      `${process.env.ERP_API_URL}/contact-form/upload-url`,
      { file_name: body.fileName },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    return NextResponse.json(signed_url);
  } catch (error) {
    handleApiError({
      error,
      message: 'Error in the signed-file-url function',
    });

    return NextResponse.json('error', { status: 500 });
  }
}
