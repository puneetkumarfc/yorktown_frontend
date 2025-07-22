import React from 'react';
import { FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="bg-mainBg min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-black mb-2 font-roboto animate-fade-in-down">Get in Touch</h1>
          <p className="text-lg text-black/70 font-poppins animate-fade-in-up">We&apos;d love to hear from you. Here&apos;s how you can reach us.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details & Map Section */}
          <div className="bg-white/80 rounded-3xl shadow-2xl p-8 lg:p-12 animate-fade-in-simple">
            <h2 className="text-3xl font-bold text-customOrange mb-8">Contact Information</h2>
            
            <div className="flex flex-col gap-8">
              {/* Phone Number */}
              <a href="tel:717-699-4647" className="flex items-center gap-4 group">
                <div className="bg-customOrange/10 p-4 rounded-full group-hover:bg-customOrange transition-all duration-200">
                  <FiPhone className="w-6 h-6 text-customOrange group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black">Phone</h3>
                  <p className="text-lg text-black/80 group-hover:text-customOrange transition-colors">717-699-4647</p>
                </div>
              </a>

              {/* Address */}
              <a href="https://www.google.com/maps/search/?api=1&query=1125+Roosevelt+Avenue,+York,+PA+17404" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="bg-customOrange/10 p-4 rounded-full group-hover:bg-customOrange transition-all duration-200">
                  <FiMapPin className="w-6 h-6 text-customOrange group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black">Address</h3>
                  <p className="text-lg text-black/80 group-hover:text-customOrange transition-colors">
                    1125 Roosevelt Avenue, York, PA 17404
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-3xl shadow-2xl overflow-hidden h-[500px] w-full animate-fade-in-simple">
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