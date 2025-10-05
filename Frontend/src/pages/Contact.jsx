import React from "react";
import { Mail, Phone, MapPin, Youtube, Instagram, MessageCircle } from "lucide-react";
import TItle from "../components/TItle";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="w-[90%] sm:max-w-6xl m-auto mt-14 text-gray-800">
      {/* Header */}
      <div className="flex justify-center items-center mb-10">
        <TItle text1={'GET'} text2={'CONNECTED'} />
      </div>

      {/* Image + Contact Info Horizontal */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img src={assets.diya3} alt="Contact" className="w-full sm:w-3/4" />
        </div>

        {/* Contact Info */}
        <div className="md:w-1/2 flex flex-col gap-6">
                <div className="storename p-2 ">Siddhi Collection</div>
        
        <div className="flex items-center gap-3">
         
            <p>123, Sanjivani College, Kopargaon, Maharashtragkgb4bgegbekuebgveuiebgveugiegeriugeguierhgeiughe getbgeughe ibgeg egiug gbujg egh gerguoger geruggunr</p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-red-500" />
            <p>123, Sanjivani College, Kopargaon, Maharashtra</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-green-600" />
            <p>+91 98765 43210</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <a href="mailto:someone@example.com" className="hover:underline">
              someone@example.com
            </a>
          </div>
        </div>
      </div>

      {/* Email Form */}
      <div className="bg-gray-100 w-[60%] m-auto p-12 mb-8">
        <h3 className="text-xl font-medium mb-4 text-center">Send us a Message</h3>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 border border-gray-300"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-3 py-2 border border-gray-300"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 resize-none"
            required
          />
          <button className="bg-black w-1/4 mx-auto text-white px-6 py-2 hover:bg-gray-900  transition">
            Send
          </button>
        </form>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-6 text-lg">
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-red-600 hover:scale-110 transition">
          <Youtube size={30} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-500 hover:scale-110 transition">
          <Instagram size={30} />
        </a>
        <a href="https://chat.whatsapp.com/" target="_blank" rel="noreferrer" className="text-green-600 hover:scale-110 transition">
          <MessageCircle size={30} />
        </a>
      </div>
    </div>
  );
};

export default Contact;
