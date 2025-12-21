import QRCode from 'qrcode';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return Response.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    return Response.json({ qrCode: qrCodeDataURL });
  } catch (error) {
    console.error('QR Code generation error:', error);
    return Response.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
