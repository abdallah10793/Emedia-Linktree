import Link from 'next/link';
import Image from 'next/image';

export default function UserFooter() {
  return (
    <footer className="py-4 mt-8 text-center">
      <div className="dark:bg-gray-900 py-4 flex justify-center">
        <Link href="https://emedia.ae" target="_blank" rel="noopener noreferrer">
          <Image
            src="/assets/logo.webp"
            alt="Emedia Logo"
            width={200}
            height={140}
            className="h-20 w-auto"
          />
        </Link>
      </div>
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()}{' '}
        <Link href="https://emedia.ae" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Emedia
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}