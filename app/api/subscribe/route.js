import { NextResponse } from 'next/server';
import { handleApiError } from 'utils/error';
import subscribeHelper from 'utils/subscribe/subscribeHelper';

const handler = async (req, res) => {
  await subscribeHelper.subscribe(req, res);
};

export default handler;

export async function POST(request) {
  const body = await request.json();

  try {
    const res = await subscribeHelper.subscribe(body);

    return NextResponse.json({ message: res.message }, { status: res.status });
  } catch (error) {
    handleApiError({
      error,
      message: 'Error in the subscribe function',
    });

    return NextResponse.json(error.message, { status: error.status });
  }
}
