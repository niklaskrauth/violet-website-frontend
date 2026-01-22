import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.883 11.883 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);

const About = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <div className="container mx-auto px-12 pt-40 pb-40">
        
        {/* Section: About Me */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-64 flex flex-col md:flex-row items-center gap-16"
        >
          <div className="flex-1">
            <h2 className="text-5xl font-black mb-8 tracking-tighter uppercase italic">About me</h2>
            <p className="text-zinc-400 text-xl leading-relaxed font-light max-w-xl">
              [Placeholder für deinen Text. Hier kannst du etwas über dich, deine Vision und deine Arbeit schreiben. 
              Lass die Leute wissen, wer hinter den Projekten steckt.]
            </p>
          </div>
          <div className="w-[400px] h-[500px] bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-zinc-600 font-medium tracking-widest uppercase text-sm">Image Placeholder</span>
          </div>
        </motion.section>

        {/* Section: About Us / Studio */}
        <div className="mb-64">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-black mb-24 tracking-tighter uppercase italic text-right"
          >
            About us / Studio
          </motion.h2>

          <div className="space-y-48">
            {/* Studio Item 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse items-center gap-16"
            >
              <div className="flex-1">
                <p className="text-zinc-400 text-xl leading-relaxed font-light max-w-xl">
                  [Placeholder für Studio-Text 1. Beschreibe die Zusammenarbeit, die Atmosphäre oder die Philosophie deines Studios.]
                </p>
              </div>
              <div className="w-[500px] h-[350px] bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-zinc-600 font-medium tracking-widest uppercase text-sm">Studio Image 1</span>
              </div>
            </motion.div>

            {/* Studio Item 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              <div className="flex-1 text-right md:text-left">
                <p className="text-zinc-400 text-xl leading-relaxed font-light max-w-xl ml-auto md:ml-0">
                  [Placeholder für Studio-Text 2. Ein weiterer Aspekt deiner Arbeit oder deines Teams.]
                </p>
              </div>
              <div className="w-[450px] h-[450px] bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-zinc-600 font-medium tracking-widest uppercase text-sm">Studio Image 2</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section: Contacts */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-24"
        >
          <h2 className="text-8xl font-black mb-16 tracking-tighter uppercase italic opacity-20">Contacts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <a href="#" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <InstagramIcon />
                </div>
                <span className="text-2xl font-medium tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <TwitterIcon />
                </div>
                <span className="text-2xl font-medium tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">Twitter / X</span>
              </a>
              <a href="#" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <WhatsAppIcon />
                </div>
                <span className="text-2xl font-medium tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-col justify-end gap-6">
              <div className="flex items-center justify-between p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 group hover:border-white/30 transition-colors">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1">Work Inquiries</p>
                  <p className="text-xl font-medium">work@violet.com</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('work@violet.com', 'work')}
                  className="p-3 rounded-lg hover:bg-white hover:text-black transition-all relative overflow-hidden"
                  title="Copy to clipboard"
                >
                  <AnimatePresence mode="wait">
                    {copiedId === 'work' ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-purple-400"
                      >
                        <CheckIcon />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CopyIcon />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 group hover:border-white/30 transition-colors">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1">Other</p>
                  <p className="text-xl font-medium">hello@violet.com</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('hello@violet.com', 'other')}
                  className="p-3 rounded-lg hover:bg-white hover:text-black transition-all relative overflow-hidden"
                  title="Copy to clipboard"
                >
                  <AnimatePresence mode="wait">
                    {copiedId === 'other' ? (
                      <motion.div
                        key="check"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-purple-400"
                      >
                        <CheckIcon />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CopyIcon />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
