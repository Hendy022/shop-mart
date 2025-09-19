import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* shopmart Information Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-black flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-black">ShopMart</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Your one-stop destination for the latest technology, fashion, and lifestyle products. 
              Quality guaranteed with fast shipping and excellent customer service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Shop Street, Octoper City, DC 12345</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                <span>(+20) 01093333333</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@shopmart.com</span>
              </div>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-black font-bold text-sm mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="text-gray-600 text-sm hover:text-black transition-colors">Electronics</Link></li>
              <li><Link href="/categories" className="text-gray-600 text-sm hover:text-black transition-colors">Fashion</Link></li>
              <li><Link href="/categories" className="text-gray-600 text-sm hover:text-black transition-colors">Home & Garden</Link></li>
              <li><Link href="/categories" className="text-gray-600 text-sm hover:text-black transition-colors">Sports</Link></li>
              <li><Link href="/categories" className="text-gray-600 text-sm hover:text-black transition-colors">Deals</Link></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h3 className="text-black font-bold text-sm mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 text-sm hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link href="/help" className="text-gray-600 text-sm hover:text-black transition-colors">Help Center</Link></li>
              <li><Link href="/track-order" className="text-gray-600 text-sm hover:text-black transition-colors">Track Your Order</Link></li>
              <li><Link href="/returns" className="text-gray-600 text-sm hover:text-black transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/size-guide" className="text-gray-600 text-sm hover:text-black transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-black font-bold text-sm mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 text-sm hover:text-black transition-colors">About shopmart</Link></li>
              <li><Link href="/careers" className="text-gray-600 text-sm hover:text-black transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-gray-600 text-sm hover:text-black transition-colors">Press</Link></li>
              <li><Link href="/investor-relations" className="text-gray-600 text-sm hover:text-black transition-colors">Investor Relations</Link></li>
              <li><Link href="/sustainability" className="text-gray-600 text-sm hover:text-black transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Policies Column */}
          <div>
            <h3 className="text-black font-bold text-sm mb-4">POLICIES</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-600 text-sm hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-600 text-sm hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-gray-600 text-sm hover:text-black transition-colors">Cookie Policy</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-600 text-sm hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="text-gray-600 text-sm hover:text-black transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
