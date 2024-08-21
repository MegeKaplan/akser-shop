import React from "react";
import {
  FaCaretRight,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    // <footer className="bg-secondary-100 w-full border mt-6 flex items-center justify-center flex-col h-[100vh] md:h-96">
    <footer className="bg-secondary-100 w-full border mt-6 flex items-center justify-center flex-col h-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="p-8 flex items-center justify-between flex-col">
          <div className="w-full mb-4 text-center md:text-left">
            <Link to={"/"} className="w-auto text-2xl sm:text-3xl">
              LOGO
            </Link>
          </div>
          <div className="w-full mb-4">
            <p className="indent-4 break-words">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum odio
              nisi enim recusandae accusantium sequi culpa sit nostrum alias
              asperiores beatae facilis obcaecati nihil vel, cumque ea iste esse
              autem doloribus corporis consectetur. Suscipit esse, accusamus
              similique ipsam ab obcaecati?
            </p>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-start flex-row">
              <a href="https://facebook.com">
                <FaFacebook className="text-social-facebook mr-5" size={30} />
              </a>
              <a href="https://instagram.com">
                <FaInstagram className="text-social-instagram mr-5" size={30} />
              </a>
              <a href="https://youtube.com">
                <FaYoutube className="text-social-youtube mr-5" size={30} />
              </a>
              <a href="https://web.whatsapp.com/">
                <FaWhatsapp className="text-social-whatsapp mr-5" size={30} />
              </a>
            </div>
          </div>
        </div>
        <div className="p-8 flex items-center justify-start flex-col">
          <div className="w-full mb-4 text-center md:text-left text-3xl border-b-2 border-primary-500 pb-1">
            Kurumsal
          </div>
          <div className="w-full mb-4">
            <ul className="w-full">
              <Link
                to={"/about"}
                className="w-full flex items-center justify-start p-2 pl-0 mb-2 hover:translate-x-4 transition duration-200"
              >
                <FaCaretRight size={20} className="text-primary-500 mr-1" />
                <span>Hakkımızda</span>
              </Link>
              <Link
                to={"/contact"}
                className="w-full flex items-center justify-start p-2 pl-0 mb-2 hover:translate-x-4 transition duration-200"
              >
                <FaCaretRight size={20} className="text-primary-500 mr-1" />
                <span>İletişim</span>
              </Link>
              <Link
                to={"/faq"}
                className="w-full flex items-center justify-start p-2 pl-0 mb-2 hover:translate-x-4 transition duration-200"
              >
                <FaCaretRight size={20} className="text-primary-500 mr-1" />
                <span>Sık Sorulan Sorular</span>
              </Link>
            </ul>
          </div>
        </div>
        <div className="p-8 flex items-center justify-start flex-col">
          <div className="w-full mb-4 text-center md:text-left text-3xl border-b-2 border-primary-500 pb-1">
            İletişim
          </div>
          <div className="w-full mb-4">
            <div className="mb-4">
              <h1 className="text-lg underline underline-offset-2">
                Adres Bilgileri
              </h1>
              <p className="indent-4 flex flex-col">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Mollitia, vitae numquam. Neque cupiditate excepturi accusamus.
              </p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg underline underline-offset-2">
                Sipariş Hattı
              </h1>
              <p className="indent-4 flex flex-col">
                <a href="tel:+905555555555">+90 555 555 55 55</a>
              </p>
            </div>
            <div className="mb-4">
              <h1 className="text-lg underline underline-offset-2">E-Posta</h1>
              <p className="indent-4 flex flex-col">
                <a href="mailto:email@mail.com">email@mail.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col p-2 select-none">
        <span>AkserShop © 2024</span>
      </div>
    </footer>
  );
};

export default Footer;
