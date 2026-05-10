import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, ArrowLeft, ChevronRight, Share2, Bookmark, Loader2 } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import { formatDate } from '../lib/utils';
import { OptimizedImage } from './OptimizedImage';
import { getSupabase } from '../lib/supabase';

export const BlogView: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    
    const fetchPosts = async () => {
      if (!supabase) {
        setPosts(MOCK_BLOG_POSTS);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        setPosts(MOCK_BLOG_POSTS);
      } else if (data) {
        const mappedPosts: BlogPost[] = data.map(post => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: post.date,
          image: post.image,
          category: post.category,
          readTime: post.read_time
        }));
        setPosts(mappedPosts.length > 0 ? mappedPosts : MOCK_BLOG_POSTS);
      } else {
        setPosts(MOCK_BLOG_POSTS);
      }
      setIsLoading(false);
    };

    fetchPosts();

    if (supabase) {
      const channel = supabase
        .channel('blog_realtime')
        .on(
          'postgres_changes',
          { event: '*', table: 'blog_posts', schema: 'public' },
          () => {
            fetchPosts();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  const mainPost = posts[0] || MOCK_BLOG_POSTS[0];
  const sidePosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-12 border-b border-white/5 pb-8">
                <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
                  The <span className="text-accent underline decoration-1 underline-offset-8">Pitch</span> Side
                </h1>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                  Latest Insights, News & Stories from the 2026 Universe
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Featured Post */}
                <div className="lg:col-span-8 group cursor-pointer" onClick={() => handlePostClick(mainPost)}>
                   <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-white/5 mb-6">
                      <OptimizedImage 
                        src={mainPost.image} 
                        alt={mainPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-black px-3 py-1 text-[10px] font-black uppercase italic tracking-widest">
                          {mainPost.category}
                        </span>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(mainPost.date)}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {mainPost.readTime}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter group-hover:text-accent transition-colors">
                        {mainPost.title}
                      </h2>
                      <p className="text-white/60 leading-relaxed text-sm md:text-base font-medium max-w-3xl">
                        {mainPost.excerpt}
                      </p>
                      <button className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest group/btn italic pt-2">
                        Read Story <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>

                {/* Sidebar Posts */}
                <div className="lg:col-span-4 space-y-8">
                   <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Trending Stories</h3>
                   {sidePosts.length > 0 ? sidePosts.map((post) => (
                      <div 
                        key={post.id} 
                        className="flex gap-4 group cursor-pointer"
                        onClick={() => handlePostClick(post)}
                      >
                         <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-sm border border-white/5">
                            <OptimizedImage 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                         </div>
                         <div className="flex flex-col justify-between py-1">
                            <div>
                               <span className="text-accent text-[8px] font-black uppercase tracking-widest block mb-1">{post.category}</span>
                               <h4 className="text-sm font-black text-white uppercase italic leading-tight group-hover:text-accent transition-colors">
                                 {post.title}
                               </h4>
                            </div>
                            <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                               <Calendar size={10} /> {formatDate(post.date)}
                            </span>
                         </div>
                      </div>
                   )) : (
                     MOCK_BLOG_POSTS.slice(1).map((post) => (
                        <div 
                          key={post.id} 
                          className="flex gap-4 group cursor-pointer"
                          onClick={() => handlePostClick(post)}
                        >
                           <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-sm border border-white/5">
                              <OptimizedImage 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                           </div>
                           <div className="flex flex-col justify-between py-1">
                              <div>
                                 <span className="text-accent text-[8px] font-black uppercase tracking-widest block mb-1">{post.category}</span>
                                 <h4 className="text-sm font-black text-white uppercase italic leading-tight group-hover:text-accent transition-colors">
                                   {post.title}
                                 </h4>
                              </div>
                              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                                 <Calendar size={10} /> {formatDate(post.date)}
                              </span>
                           </div>
                        </div>
                     ))
                   )}

                   <div className="p-6 bg-white/5 border border-white/10 rounded-sm mt-12">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2 italic">Subscribe to News</h4>
                      <p className="text-[10px] text-white/40 mb-4 leading-relaxed font-bold">Get the latest tournament updates delivered to your inbox.</p>
                      <div className="flex gap-2">
                         <input 
                            type="email" 
                            placeholder="EMAIL ADDRESS" 
                            className="bg-black border border-white/10 text-[10px] font-bold p-3 w-full outline-none focus:border-accent uppercase"
                         />
                         <button className="bg-accent text-black px-4 font-black uppercase text-[10px] italic hover:bg-white transition-colors">
                            Join
                         </button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="blog-post"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-white/40 hover:text-white mb-8 text-[10px] font-black uppercase tracking-widest group transition-colors italic"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to News
              </button>

              <div className="space-y-4 mb-12">
                 <div className="flex items-center gap-2">
                    <span className="bg-accent text-black px-3 py-1 text-[10px] font-black uppercase italic tracking-widest">
                       {selectedPost.category}
                    </span>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2 px-4 border-l border-white/10">
                       <Clock size={12} /> {selectedPost.readTime}
                    </span>
                 </div>
                 <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                   {selectedPost.title}
                 </h1>
                 <div className="flex items-center justify-between py-6 border-y border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-black italic">
                          {selectedPost.author[0]}
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest italic">{selectedPost.author}</p>
                          <p className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">{formatDate(selectedPost.date)}</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <button className="text-white/40 hover:text-white transition-colors"><Share2 size={18} /></button>
                       <button className="text-white/40 hover:text-white transition-colors"><Bookmark size={18} /></button>
                    </div>
                 </div>
              </div>

              <div className="aspect-[16/9] mb-12 border border-white/5 overflow-hidden rounded-sm">
                 <OptimizedImage 
                    src={selectedPost.image} 
                    alt={selectedPost.title} 
                    className="w-full h-full object-cover"
                 />
              </div>

              <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-p:font-medium max-w-none mb-20 whitespace-pre-line prose-headings:italic prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tighter">
                 {selectedPost.content}
              </div>

              <div className="p-8 bg-white/5 border border-white/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="text-center md:text-left">
                    <h4 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">Want more insights?</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Follow the tournament journey daily.</p>
                 </div>
                 <div className="flex gap-4">
                    <button className="bg-accent text-black px-8 h-12 font-black uppercase text-xs italic tracking-widest hover:bg-white transition-colors">
                       Follow News
                    </button>
                    <button className="border border-white/10 text-white px-8 h-12 font-black uppercase text-xs italic tracking-widest hover:bg-white/10 transition-colors">
                       Share
                    </button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
