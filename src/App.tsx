import { useState, useMemo } from 'react';
import { Search, Star, Film, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOVIES = [
  { id: 1, title: "Dune: Part Two", year: 2024, rating: 9.1, genre: ["Sci-Fi", "Adventure"], poster: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80" },
  { id: 2, title: "The Batman", year: 2022, rating: 8.5, genre: ["Action", "Crime"], poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80" },
  { id: 3, title: "Everything Everywhere", year: 2022, rating: 8.9, genre: ["Sci-Fi", "Comedy"], poster: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&q=80" },
  { id: 4, title: "Oppenheimer", year: 2023, rating: 9.2, genre: ["Biography", "Drama"], poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80" },
];

export default function App() {
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const genres = ["All", ...Array.from(new Set(MOVIES.flatMap(m => m.genre)))];

  const visible = useMemo(() => MOVIES.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || m.genre.includes(filter);
    return matchesSearch && matchesFilter;
  }), [search, filter]);

  const toggleWatch = (id: number) => setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-[Outfit] selection:bg-amber-500/30">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xl tracking-tight"><Film className="w-7 h-7" /> CineVault</div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-amber-400 transition">Discover</a>
          <a href="#" className="hover:text-amber-400 transition">Watchlist ({watchlist.length})</a>
        </div>
      </nav>

      <header className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tighter">Discover Your Next <span className="text-amber-400">Masterpiece</span></h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8">Curate, filter, and keep your favorite films in one beautiful watchlist.</p>
          <div className="flex justify-center gap-4">
            <button onClick={() => document.getElementById('browse')?.scrollIntoView({behavior:'smooth'})} className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-full transition shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]">Browse Movies</button>
          </div>
        </div>
      </header>

      <main id="browse" className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 pb-24">
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-stretch">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search movies..." className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {genres.map(g => (
                <button key={g} onClick={() => setFilter(g)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${filter === g ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-300 hover:text-white border border-white/5'}`}>{g}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {visible.map(movie => (
                <motion.div layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.9}} key={movie.id} className="group relative bg-slate-950 rounded-2xl overflow-hidden border border-white/5 shadow-xl hover:shadow-amber-500/10 transition">
                  <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button onClick={() => toggleWatch(movie.id)} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${watchlist.includes(movie.id) ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:text-rose-400'}`}><Heart className="w-5 h-5" /></button>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 truncate">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                      <span>{movie.year}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-4 h-4 fill-amber-400" /> {movie.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {movie.genre.map(g => <span key={g} className="px-2 py-0.5 text-xs font-medium bg-white/5 rounded-md text-slate-300">{g}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
