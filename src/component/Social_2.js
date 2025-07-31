import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTelegramPlane, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

export default function Social_2() {
  const [social, setSocial] = useState(null);

  useEffect(() => {
    fetch("https://ibrahim.page.gd/api/social")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSocial(data[0]);
        } else {
          setSocial(data);
        }
      })
      .catch((error) => {
        console.error("فشل في جلب بيانات السوشيال:", error);
      });
  }, []);

  if (!social) return <p>جاري التحميل...</p>;

  return (
    <ul className="social-links flex gap-4">
      {social.facebook && (
        <li>
          <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
        </li>
      )}
      {social.instagram && (
        <li>
          <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </li>
      )}
      {social.x && (
        <li>
          <a href={social.x} aria-label="X" target="_blank" rel="noopener noreferrer">
            <SiX />
          </a>
        </li>
      )}
      {social.telegram && (
        <li>
          <a href={social.telegram} aria-label="Telegram" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane />
          </a>
        </li>
      )}
      {social.linkedin && (
        <li>
          <a href={social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </li>
      )}
      {social.youtube && (
        <li>
          <a href={social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </li>
      )}
    </ul>
  );
}
