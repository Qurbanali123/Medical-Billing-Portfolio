import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    { 
      label: 'Email', 
      value: 'suhaibkhalid@gmail.com', 
      icon: <Mail className="text-primary" />,
      link: 'mailto:suhaibkhalid@gmail.com'
    },
    { 
      label: 'Phone', 
      value: '+92 3216820506', 
      icon: <Phone className="text-secondary" />,
      link: 'tel:+923216820506'
    },
    { 
      label: 'Location', 
      value: 'Remote, Pakistan', 
      icon: <MapPin className="text-accent" />,
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Let's <span className="text-primary">Talk</span></h2>
              <p className="text-gray-500 text-lg">Looking for a professional medical billing expert for your practice? Reach out to me via any of these channels.</p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.a 
                  key={i}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-6 glass rounded-2xl group transition-all hover:scale-105"
                >
                  <div className="p-4 bg-white rounded-xl shadow-sm">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="text-xl font-bold group-hover:text-primary transition-colors">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-4 bg-white rounded-xl text-gray-400 hover:text-primary transition-colors shadow-sm">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" className="w-full p-4 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full p-4 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea rows="5" className="w-full p-4 bg-white/50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none transition-all" placeholder="How can I help you?"></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25">
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      
      <footer className="mt-32 pt-16 border-t border-gray-200 text-center">
        <p className="text-gray-400 text-sm">© 2026 Sohaib Khalid. All rights reserved. Designed for Excellence in Medical Billing.</p>
      </footer>
    </section>
  );
};

export default Contact;
