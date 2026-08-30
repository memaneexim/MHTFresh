import React, { useState } from 'react';
import { Leaf, Award, Globe2, ShieldCheck, Phone, ArrowUpRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Fresh Cavendish Bananas',
    category: 'Fruits',
    variety: 'Grand Naine (G9)',
    origin: 'India',
    packaging: '13.5 kg / 18 kg Box',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    grade: 'A+ Export Quality',
  },
  {
    id: 2,
    name: 'Red Onions',
    category: 'Vegetables',
    variety: 'Nashik Red (45mm - 55mm)',
    origin: 'India',
    packaging: '25 kg / 50 kg Mesh Bags',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    grade: 'Export Standard',
  },
  {
    id: 3,
    name: 'Pomegranate (Bhagwa)',
    category: 'Fruits',
    variety: 'Super Bhagwa Deep Red',
    origin: 'India',
    packaging: '3.5 kg / 5 kg Cartons',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    grade: 'Premium Global Grade',
  },
  {
    id: 4,
    name: 'Fresh Green Chilli',
    category: 'Vegetables',
    variety: 'G4 / Bullet Green',
    origin: 'India',
    packaging: '4 kg / 5 kg Air Box',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    grade: 'Export Grade',
  },
];

const CATEGORIES = ['All', 'Fruits', 'Vegetables'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Header */}
      <section className="bg-emerald-950 text-white py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Leaf className="w-3.5 h-3.5" /> Farm Fresh Export Supply
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our Premium Export Products
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Sourced directly from certified growers, processed with rigorous quality control, and shipped globally.
          </p>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-6 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase text-slate-800">APEDA Certified</span>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase text-slate-800">Global GAP Standard</span>
          </div>
          <div className="flex flex-col items-center">
            <Globe2 className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase text-slate-800">Cold-Chain Logistics</span>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-6 h-6 text-emerald-600 mb-2" />
            <span className="text-xs font-bold uppercase text-slate-800">100% Farm Fresh</span>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  {product.grade}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-4 space-y-1.5 text-xs text-slate-600 flex-grow">
                  <p><span className="font-semibold text-slate-800">Variety:</span> {product.variety}</p>
                  <p><span className="font-semibold text-slate-800">Origin:</span> {product.origin}</p>
                  <p><span className="font-semibold text-slate-800">Packing:</span> {product.packaging}</p>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=Inquiry%20for%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-medium text-xs py-2.5 rounded-xl transition-colors"
                >
                  Request Quote <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}