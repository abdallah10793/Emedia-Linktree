'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function QRCodeButton({ pageUri }) {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const generateQR = async () => {
    try {
      const url = `${window.location.origin}/${pageUri}`;
      const response = await fetch(`/api/qr?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        setQrCode(data.qrCode);
        setShowQR(true);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <>
      <button
        onClick={generateQR}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        <FontAwesomeIcon icon={faQrcode} className="mr-2" />
        Generate QR Code
      </button>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">QR Code for Your Page</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="text-center">
              <img
                src={qrCode}
                alt="QR Code"
                className="mx-auto mb-4"
              />
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code to visit your page
              </p>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrCode;
                  link.download = 'qr-code.png';
                  link.click();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
