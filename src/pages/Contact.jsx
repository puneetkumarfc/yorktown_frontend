import React from 'react';
import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="bg-mainBg min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-roboto mt-22">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold text-black mb-1 font-roboto_serif animate-fade-in-down">Get in Touch</h1>
          <p className="text-sm text-black/50 font-light font-roboto animate-fade-in-up">We'd love to hear from you. Here's how you can reach us.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details & Map Section */}
          <div className="bg-mainBg rounded-3xl shadow-sm border border-black/5 p-8 lg:p-10 animate-fade-in-simple">
            <h2 className="text-xl font-bold text-customOrange mb-8 font-roboto_serif">Contact Information</h2>
            
            <div className="flex flex-col gap-6">
              {/* Phone Number */}
              <a href="tel:717-699-4647" className="block p-5 rounded-2xl bg-customBeige/40 hover:bg-customBeige transition-all duration-300 group">
                <div className="flex items-center gap-5">
                  <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-customOrange transition-all duration-300">
                    <FiPhone className="w-6 h-6 text-customOrange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Phone</h3>
                    <p className="text-base text-black/70 group-hover:text-customOrange transition-colors duration-300">717-699-4647</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:contact@eatatyorktown.com" className="block p-5 rounded-2xl bg-customBeige/40 hover:bg-customBeige transition-all duration-300 group">
                <div className="flex items-center gap-5">
                  <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-customOrange transition-all duration-300">
                    <FiMail className="w-6 h-6 text-customOrange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Email</h3>
                    <p className="text-base text-black/70 group-hover:text-customOrange transition-colors duration-300">contact@eatatyorktown.com</p>
                  </div>
                </div>
              </a>

              {/* Address */}
              <a href="https://www.google.com/maps/search/?api=1&query=1125+Roosevelt+Avenue,+York,+PA+17404" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl bg-customBeige/40 hover:bg-customBeige transition-all duration-300 group">
                <div className="flex items-center gap-5">
                  <div className="bg-white p-4 rounded-full shadow-sm group-hover:bg-customOrange transition-all duration-300">
                    <FiMapPin className="w-6 h-6 text-customOrange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">Address</h3>
                    <p className="text-base text-black/70 group-hover:text-customOrange transition-colors duration-300">1125 Roosevelt Avenue, York, PA 17404</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-xl shadow-md overflow-hidden h-full w-full animate-fade-in-simple">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.423581335099!2d-76.7562391846182!3d39.9545465794215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c88c0b7c7b0d9b%3A0x8b3f2b4e8f1b4e4e!2s1125%20Roosevelt%20Ave%2C%20York%2C%20PA%2017404%2C%20USA!5e0!3m2!1sen!2sin!4v1673443434343"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 