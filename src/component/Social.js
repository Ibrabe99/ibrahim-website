import React, { Component } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export class Social extends Component {
  render() {
    return (
<div className="social-container">
  <div className="social-content">
    <div className="social-header">
  
    </div>

    <ul className="social-links">
      <li><a href="/#" aria-label="Facebook"><FaFacebook /></a></li>
      <li><a href="/#" aria-label="Instagram"><FaInstagram /></a></li>
      <li><a href="/#" aria-label="Twitter"><FaTwitter /></a></li>
      <li><a href="/#" aria-label="Telegram"><FaTelegramPlane /></a></li>
      <li><a href="/#" aria-label="LinkedIn"><FaLinkedin /></a></li>
      <li><a href="/#" aria-label="YouTube"><FaYoutube /></a></li>
    </ul>
  </div>
</div>

    );
  }
}

export default Social;
