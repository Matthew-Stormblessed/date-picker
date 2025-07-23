import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { body, to } = await request.json();

  // Example: to = '1234567890@vtext.com' for Verizon
  // Set these in your .env.local file
  const emailUser = 'kaladin12316@yahoo.com';
  const emailPass = 'azhutducyndsunju';
  const emailService = process.env.EMAIL_SERVICE || 'yahoo';

  if (!emailUser || !emailPass) {
    return NextResponse.json({ error: 'Email credentials missing' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: emailUser,
      to,
      subject: '', // SMS gateways ignore subject
      text: body,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Email error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
