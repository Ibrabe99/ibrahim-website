import React, { Component } from "react";
import { FaFacebook, FaInstagram, FaTelegramPlane, FaLinkedin, FaYoutube } from "react-icons/fa";
import { SiX } from 'react-icons/si';

export class Social extends Component {
  state = {
    socialLinks: null,
  };

  componentDidMount() {
    fetch("http://www.ibrahim.page.gd/api/social")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.setState({ socialLinks: data[0] });
        }
      })
      .catch((error) => {
        console.error("خطأ في تحميل روابط السوشيال:", error);
      });
  }

  render() {
    const { socialLinks } = this.state;

    if (!socialLinks) {
      return null; // أو عرض سبينر مؤقتاً
    }

    return (
      <div className="social-container">
        <div className="social-content">
          <ul className="social-links">
            {socialLinks.facebook && (
              <li>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </li>
            )}
            {socialLinks.instagram && (
              <li>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </li>
            )}
            {socialLinks.x && (
              <li>
                <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" aria-label="X">
                  <SiX />
                </a>
              </li>
            )}
            {socialLinks.telegram && (
              <li>
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <FaTelegramPlane />
                </a>
              </li>
            )}
            {socialLinks.linkedin && (
              <li>
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              </li>
            )}
            {socialLinks.youtube && (
              <li>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Social;
