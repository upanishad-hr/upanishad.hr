import React, { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';

interface SecureContactProps {
  email: string;
  phone: string;
}

const SecureContact: React.FC<SecureContactProps> = ({ email, phone }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const handleEmailClick = () => {
    if (!emailRevealed) {
      setEmailRevealed(true);
    } else {
      navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handlePhoneClick = () => {
    if (!phoneRevealed) {
      setPhoneRevealed(true);
    } else {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 px-8 py-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/10 hover:bg-black/60">

        {/* Email Button */}
        <button
          onClick={handleEmailClick}
          className="group flex items-center gap-3 focus:outline-none transition-opacity hover:opacity-100 opacity-80"
          title={emailRevealed ? "Click to copy email" : "Click to reveal email"}
        >
          <div className={`transition-colors duration-300 ${copiedEmail ? 'text-green-400' : 'text-gray-400 group-hover:text-green-300'}`}>
            {copiedEmail ? <Check size={18} /> : emailRevealed ? <Copy size={18} /> : <Mail size={18} />}
          </div>
          <span className="text-sm md:text-base font-light tracking-wide text-gray-300 group-hover:text-white transition-colors">
            {copiedEmail ? 'Copied!' : emailRevealed ? email : 'Click to reveal email'}
          </span>
        </button>

        {/* Subtle Separator */}
        <div className="hidden md:block w-px h-6 bg-white/10"></div>

        {/* Phone Button */}
        <button
          onClick={handlePhoneClick}
          className="group flex items-center gap-3 focus:outline-none transition-opacity hover:opacity-100 opacity-80"
          title={phoneRevealed ? "Click to copy phone number" : "Click to reveal phone"}
        >
          <div className={`transition-colors duration-300 ${copiedPhone ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-300'}`}>
            {copiedPhone ? <Check size={18} /> : phoneRevealed ? <Copy size={18} /> : <Phone size={18} />}
          </div>
          <span className="text-sm md:text-base font-light tracking-wide text-gray-300 group-hover:text-white transition-colors">
            {copiedPhone ? 'Copied!' : phoneRevealed ? phone : 'Click to reveal phone'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SecureContact;
