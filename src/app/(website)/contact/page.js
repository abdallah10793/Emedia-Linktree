import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FaTwitter,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaBriefcase,
} from "react-icons/fa";

export const metadata = {
  title: "Emedia Linktree | Contact",
  description:
    "Share your links, social profiles, contact info and more on one page",
};

export default function Contact() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <main className="flex flex-col items-center w-full flex-1 px-4 md:px-20 text-center">
        <div className="bg-gray-800 rounded-lg p-4">
          <Image
            src={"/assets/logo.webp"}
            alt="banner image"
            height={400}
            width={400}
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
          Get in Touch
        </h1>

        <div className="flex flex-wrap justify-center gap-6 text-gray-600">
          <a
            href="https://x.com/emediauae"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size="2em" />
          </a>
          <a
            href="https://www.facebook.com/Emediamarketing.ae"
            className="hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size="2em" />
          </a>
          {/* <a
            href="https://github.com/jeffjiang13"
            className="hover:text-gray-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size="2em" />
          </a> */}
          <a
            href="https://www.linkedin.com/in/emedia-marketing-34542315b/"
            className="hover:text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn size="2em" />
          </a>
          <a
            href="https://emedia.ae/"
            className="hover:text-red-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaBriefcase size="2em" />
          </a>
        </div>
      </main>
    </div>
  );
}
