import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, country, subject, message, referral } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'srvc92.trwww.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'contact@roversan.com',
        pass: 'ROVERSAn.1295',
      },
    })

    // Email content
    const mailOptions = {
      from: 'contact@roversan.com',
      to: 'info@roversan.com',
      subject: `Yeni İletişim Formu Mesajı: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C7A27A 0%, #B8946B 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #C7A27A; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #C7A27A; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 Yeni İletişim Formu Mesajı</h2>
              <p>Roversan Gıda Web Sitesi</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Ad Soyad:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 E-posta:</div>
                <div class="value">${email}</div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">📞 Telefon:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              ${country ? `
              <div class="field">
                <div class="label">🌍 Ülke:</div>
                <div class="value">${country}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">📋 Konu:</div>
                <div class="value">${subject}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Mesaj:</div>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              
              ${referral && referral.length > 0 ? `
              <div class="field">
                <div class="label">📢 Roversan'ı Nereden Duydunuz:</div>
                <div class="value">${referral.join(', ')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Bu mesaj Roversan Gıda web sitesi iletişim formundan gönderilmiştir.</p>
              <p>Gönderim Zamanı: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Yeni İletişim Formu Mesajı

Ad Soyad: ${name}
E-posta: ${email}
${phone ? `Telefon: ${phone}` : ''}
${country ? `Ülke: ${country}` : ''}
Konu: ${subject}

Mesaj:
${message}

${referral && referral.length > 0 ? `Roversan'ı Nereden Duydunuz: ${referral.join(', ')}` : ''}

Gönderim Zamanı: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

