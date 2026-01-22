import PuresoundLogo from "@/components/Utility/PuresoundLogo";
import {useTranslations} from "next-intl";
import {Facebook, Instagram, LinkedIn} from "@/components/Icon/Brand/brand";

const Footer = () => {
  const t = useTranslations("Listener.Common");
  return (
    <footer className="mt-16 pt-6 mr-4 lg:mr-6 border-t border-gray-700/50">
      {/* Main Footer Content */}
      <div className="flex flex-col justify-center items-center space-y-3 mb-6">
        <PuresoundLogo size={60}/>
        <p className="text-base text-gray-400 leading-relaxed">
          {t('appDescription')}
        </p>

        {/* Social Media */}
        <div className="flex space-x-3">
          <a href="#"
             className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
            <Facebook size={18} className="text-gray-400"/>
          </a>
          <a href="#"
             className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
            <Instagram size={18} className="text-gray-400"/>
          </a>
          <a href="#"
             className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
            <LinkedIn size={18} className="text-gray-400"/>
          </a>
        </div>
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center space-x-6 text-sm text-gray-400">
          <a href="#" className="hover:text-gray-300 transition-colors">{t('link.privacy')}</a>
          <a href="#" className="hover:text-gray-300 transition-colors">{t('link.terms')}</a>
          <a href="#" className="hover:text-gray-300 transition-colors">{t('link.support')}</a>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-6 border-t border-gray-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>© {new Date().getFullYear()} PureSound. All Rights Reserved.</span>
          </div>

          {/* Made with love */}
          <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
            <span>Made with</span>
            <svg className="w-3 h-3 text-red-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"/>
            </svg>
            <span>by Dung Pham</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
