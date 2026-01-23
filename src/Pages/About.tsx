import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
              Auf der Suche nach Licht in meinem trüben Alltag das mir Hoffnung und Freude schenken kann fand ich eines Tages die Freude von Manga und Anime.
              Welche mir durch das Eintauchen in deren fiktiven Welten und Artstyles wie die Strahlen der Sonne gewärmt haben und mich letzten auch dazu motivierten selbst Charakters, Animationen und Storys zu kreieren.
              Damit möchte ich dieses Licht das mich gewärmt hat und heute noch antreibt mit anderen Menschen mit meinen Kreationen teilen.
              Auf dass ich darin euer eigenes Licht finden werdet.
              <br />
              <br />
              - VI
            </p>
          </div>
          <div className="w-[400px] h-[500px] bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src="/assets/images/Violet.png" 
              alt="Violet" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
            />
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
                  Aktuelle Angestellte: 1
                  <br/>
                  Geräte:
                  <br/>
                  PC - 1
                  <br/>
                  Laptop - 1
                  <br/>
                  Grafik Tablet/Tablet - 1
                  <br/>
                  Adresse: Isedol Lachsstraße 304
                </p>
              </div>
              <div className="w-[500px] h-[350px] bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                    src="https://www.macromedia-fachhochschule.de/wp-content/uploads/2021/05/210520-macromedia-hochschule-freiburg-campus-8-1620x912-cs.jpg"
                    alt="Office"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                />
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
              <a 
                href="https://www.instagram.com/ani.nation.memes?igsh=MWluYzczbndkNG5i" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-6 group"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <img src="/assets/images/Instragram.png" alt="Instagram" className="w-8 h-8 object-contain" />
                </div>
                <span className="text-2xl font-medium tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">Instagram</span>
              </a>
            </div>

            <div className="flex flex-col justify-end gap-6">
              <div className="flex items-center justify-between p-6 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/10 group hover:border-white/30 transition-colors">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-1">Work Inquiries</p>
                  <p className="text-xl font-medium">work@violet.com</p>
                </div>
                <button 
                  onClick={() => copyToClipboard('Violet', 'work')}
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
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
