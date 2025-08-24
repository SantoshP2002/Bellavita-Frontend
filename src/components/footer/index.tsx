import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">MyShop</h2>
          <p className="text-sm leading-6">
            MyShop ek trusted e-commerce platform hai jaha aapko best quality
            products milte hain affordable price me.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li className="hover:text-indigo-500 cursor-pointer">Home</li>
            <li className="hover:text-indigo-500 cursor-pointer">Shop</li>
            <li className="hover:text-indigo-500 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-500 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-500 text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-indigo-500 text-lg">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-indigo-500 text-lg">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-indigo-500 text-lg">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
