import React from "react";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        {/* Owner Image */}
        <img
          src="https://via.placeholder.com/250" // Replace with owner image
          alt="Owner"
          className="w-60 h-60 object-cover rounded-2xl shadow-lg"
        />

        {/* Owner Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">About The Owner</h2>
          <p className="text-gray-600 leading-relaxed">
            Hello, I am <span className="font-semibold">Amruta Agarkar </span>.  
            I started this journey with passion and dedication to deliver the best
            products and services to my customers. With creativity, innovation, 
            and commitment, I aim to provide something unique and meaningful to everyone.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
          <img
            src="https://via.placeholder.com/400x250"
            alt="Gallery 1"
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
          <img
            src="https://via.placeholder.com/400x250"
            alt="Gallery 2"
            className="w-full h-56 object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
          <img
            src="https://via.placeholder.com/400x250"
            alt="Gallery 3"
            className="w-full h-56 object-cover"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 relative inline-block">
          Why Choose Us?
          
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Because we believe in quality, creativity, and building trust with our customers.  
          <span className="font-semibold block mt-2 text-lg text-pink-600">
            "Your satisfaction is our true achievement."
          </span>
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12 bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
          Visit Our Shop Now 🚀
        </h2>
        <p className="text-lg text-white/90 mb-6">
          Explore our exclusive collection and grab your favorites today!
        </p>
        <NavLink to='/collection'>
      
        <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 ">
          Shop Now
        </button>
        </NavLink>
      </div>
    </div>
  );
};

export default AboutUs;
