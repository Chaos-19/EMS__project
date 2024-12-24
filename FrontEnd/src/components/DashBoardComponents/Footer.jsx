import React from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-yellow-700 hover:shadow-lg transition-all duration-300">Address</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 hover:text-gold transition-colors duration-300">
              <MapPinIcon className="h-5 w-5 mr-2 hover:text-yellow-700 transition-colors duration-300" />
              <span className='hover:text-blue-500 hover:underline transition-colors duration-300'>
                123 Event Street, City, Country 
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-yellow-700 hover:shadow-lg transition-all duration-300">Contact</h2>
            <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2 hover:text-gold transition-colors duration-300">
              <EnvelopeIcon className="h-5 w-5 mr-2 hover:text-blue-500 hover:underline transition-colors duration-300" />
              <span className='hover:text-blue-500 hover:underline transition-colors duration-300'>
                Email: info@companyevents.com
            </span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gold transition-colors duration-300">
              <PhoneIcon className="h-5 w-5 mr-2 hover:text-blue-500 hover:underline transition-colors duration-300" />
             <span className='hover:text-blue-500 hover:underline transition-colors duration-300'>
                Phone: +123 456 7890
            </span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-yellow-700 hover:shadow-lg transition-all duration-300">Services</h2>
            <ul className="text-gray-600 dark:text-gray-300">
              <li className="hover:text-blue-500 hover:underline transition-colors duration-300">Decoration</li>
              <li className="hover:text-blue-500 hover:underline transition-colors duration-300">Lighting</li>
              <li className="hover:text-blue-500 hover:underline transition-colors duration-300">Catering</li>
              <li className="hover:text-blue-500 hover:underline transition-colors duration-300">Sound System</li>
              <li className="hover:text-blue-500 hover:underline transition-colors duration-300">Event Planning</li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-yellow-700 hover:shadow-lg transition-all duration-300">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 hover:shadow-lg transition-all duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-400 hover:shadow-lg transition-all duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-blue-700 hover:shadow-lg transition-all duration-300">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-pink-600 hover:shadow-lg transition-all duration-300">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4">
          <p className="text-center text-gray-600 dark:text-gray-300">
            © 2024 Company Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}