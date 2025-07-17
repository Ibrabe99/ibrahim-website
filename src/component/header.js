import { IoMdMailUnread } from "react-icons/io";
// import BackgroundSplit from "./BackgroundSplit";
export default function Header() {
  return (
    <header id="header">
      <nav className="navbar" dir="rtl">
        <a href="#home" className="logo" onClick={(e) => e.preventDefault()}>
           Ibrahim {/* M.Banour */}
        </a>

        <ul>
          <li>
            <a href="#header" onClick={(e) => e.preventDefault()} >الرئيسية</a>
          </li>
          <li>
            <a href="#header" onClick={(e) => e.preventDefault()}>المشاريع</a>
          </li>
          <li>
            <a href="#header" onClick={(e) => e.preventDefault()}>المقالات</a>
          </li>
          <li>
            <a href="#header" onClick={(e) => e.preventDefault()}> نبذة عني</a>
          </li>
        </ul>
        <div className="send_me">
          <a href="#send_me" className="send_me_link" onClick={(e) => e.preventDefault()}>
           
            تواصل معي <IoMdMailUnread />
          </a>
   
        </div>
      </nav>
    </header>
  );
}
