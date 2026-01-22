import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

const products: Product[] = [
  { id: '1', title: 'Violet Crystal', price: 49.99, description: 'A rare violet crystal that glows in the dark.', imageUrl: 'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Crystal+1' },
  { id: '2', title: 'Aether Fragment', price: 29.99, description: 'A fragment of pure aether collected from the nebula.', imageUrl: 'https://via.placeholder.com/400x400/a78bfa/ffffff?text=Fragment+2' },
  { id: '3', title: 'Nebula Dust', price: 15.00, description: 'Finely ground dust from the center of a nebula.', imageUrl: 'https://via.placeholder.com/400x400/c4b5fd/ffffff?text=Dust+3' },
  { id: '4', title: 'Shadow Shard', price: 35.50, description: 'A shard of shadow found in the deepest craters.', imageUrl: 'https://via.placeholder.com/400x400/4c1d95/ffffff?text=Shard+4' },
  { id: '5', title: 'Light Essence', price: 55.00, description: 'Pure essence of light captured in a glass sphere.', imageUrl: 'https://via.placeholder.com/400x400/ddd6fe/ffffff?text=Essence+5' },
  { id: '6', title: 'Void Core', price: 99.99, description: 'The core of a void, powerful and mysterious.', imageUrl: 'https://via.placeholder.com/400x400/2e1065/ffffff?text=Core+6' },
];

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const handlePurchase = () => {
    setShowError(true);
    setCart([]);
    setIsCartOpen(false);
    setSelectedProduct(null);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen text-white pt-32 pb-20 px-4 md:px-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/assets/images/Store_Background_main.png" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <motion.img 
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          src="/assets/images/Store_Background_arm.png" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <motion.img 
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          src="/assets/images/Store_Background_Star.png" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Store</h2>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full backdrop-blur-md border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 mb-4">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider">{product.title}</h3>
              <p className="text-zinc-400 font-light">{product.price.toFixed(2)} €</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row shadow-2xl"
            >
              <div className="md:w-1/2 aspect-square">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="text-3xl font-black uppercase mb-4">{selectedProduct.title}</h3>
                <p className="text-2xl font-bold text-purple-400 mb-6">{selectedProduct.price.toFixed(2)} €</p>
                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                  {selectedProduct.description}
                </p>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    disabled={cart.some(item => item.id === selectedProduct.id)}
                    className="w-full py-4 bg-white text-black font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all rounded-xl flex items-center justify-center gap-3 group"
                  >
                    {cart.some(item => item.id === selectedProduct.id) ? (
                      <span>Im Warenkorb</span>
                    ) : (
                      <>
                        <span className="text-2xl transition-transform group-hover:scale-125">+</span>
                        In den Warenkorb
                      </>
                    )}
                  </button>

                  <button 
                    onClick={() => {
                      if (!cart.some(item => item.id === selectedProduct.id)) {
                        addToCart(selectedProduct);
                      }
                      handlePurchase();
                    }}
                    className="w-full py-4 bg-purple-600 text-white font-black uppercase tracking-widest hover:bg-purple-500 transition-all rounded-xl flex items-center justify-center gap-3"
                  >
                    Instant Buy
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-32 right-0 bottom-0 w-full md:w-[450px] bg-zinc-900/95 backdrop-blur-2xl z-[110] border-l border-t border-white/10 p-6 shadow-2xl flex flex-col rounded-tl-3xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Warenkorb</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-6">
              {cart.length === 0 ? (
                <p className="text-zinc-500 text-center mt-20 font-light italic">Dein Warenkorb ist leer.</p>
              ) : (
                cart.map((item, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${item.id}-${index}`} 
                    className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-grow">
                      <h4 className="font-bold uppercase text-sm tracking-wider">{item.title}</h4>
                      <p className="text-zinc-400 text-sm">{item.price.toFixed(2)} €</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-zinc-400 uppercase tracking-widest text-sm">Gesamtbetrag</span>
                <span className="text-2xl font-black">{totalPrice.toFixed(2)} €</span>
              </div>
              <button 
                onClick={handlePurchase}
                disabled={cart.length === 0}
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black uppercase tracking-[0.2em] transition-all rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] active:scale-95"
              >
                Kaufen
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error Popup */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowError(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border-2 border-red-500/50 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">Fehler</h3>
              <p className="text-zinc-400 mb-8">
                Du hast zu wenig Geld, um diesen Einkauf abzuschließen. Dein Warenkorb wurde geleert.
              </p>
              <button
                onClick={() => setShowError(false)}
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-lg"
              >
                Verstanden
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Store;
