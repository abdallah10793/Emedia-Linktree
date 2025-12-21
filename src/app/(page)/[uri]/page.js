'use client';

import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default function UserPage({ params }) {
  const [page, setPage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const response = await fetch(`/api/page/${params.uri}`);
        if (response.ok) {
          const data = await response.json();
          setPage(data.page);
          setUser(data.user);

          // Track view
          await fetch('/api/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uri: params.uri, page: params.uri }),
          });
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [params.uri]);



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!page || !user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <p
          style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
        >
          Page Not Found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-grow">
        <div
          className="h-36 bg-gray-400 bg-cover bg-center"
          style={
            page.bgType === "color"
              ? { backgroundColor: page.bgColor }
              : { backgroundImage: `url(${page.bgImage})` }
          }
        ></div>
        <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-12">
          <Image
            className="rounded-full w-full h-full object-cover"
            src={user.image}
            alt="avatar"
            width={256}
            height={256}
          />
        </div>
        <h2 className="text-2xl text-center mb-1">{page.displayName}</h2>
        <h3 className="text-md flex gap-2 justify-center items-center">
          <FontAwesomeIcon className="h-4" icon={faLocationDot} />
          <span>{page.location}</span>
        </h3>
        <div className="max-w-xs mx-auto text-center my-2">
          <p>{page.bio}</p>
        </div>
        <div className="flex gap-2 justify-center mt-4 pb-4">
          {Object.keys(page.buttons).filter(buttonKey => buttonKey !== 'github').map((buttonKey) => (
            <Link
              key={buttonKey}
              href={buttonLink(buttonKey, page.buttons[buttonKey])}
              className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center hover:bg-gray-200 border border-gray-300"
            >
              <FontAwesomeIcon
                className="w-5 h-5"
                icon={buttonsIcons[buttonKey]}
              />
            </Link>
          ))}

        </div>
        <div className="max-w-2xl mx-auto grid md:grid-cols-1 gap-6 p-4 px-8">
          {page.links.map((link) => (
            <Link
              key={link.url}
              target="_blank"
              className="bg-white p-2 flex hover:bg-gray-100 rounded-md font-extrabold border-2 border-gray-300"
              href={link.url}
            >
              <div className="relative -left-7 w-18">
                <div className="w-16 h-16 bg-blue-200 aspect-square relative flex items-center justify-center rounded-full border-2 border-gray-300">
                  {link.icon && (
                    <Image
                      className="w-full h-full object-cover rounded-full"
                      src={link.icon}
                      alt={"icon"}
                      width={64}
                      height={64}
                    />
                  )}
                  {!link.icon && (
                    <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center shrink grow-0 overflow-hidden">
                <div className="">
                  <h3 className="">{link.title}</h3>
                  <p className="text-sm text-gray-400 overflow-hidden">
                    {link.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>



      <div className="dark:bg-gray-900 py-4 flex justify-center mt-auto">
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
    </div>
  );
}
