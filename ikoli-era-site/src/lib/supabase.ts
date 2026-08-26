import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from '../data/blogData';
import { INITIAL_BLOG_POSTS } from '../data/blogData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  if (!supabase) {
    return INITIAL_BLOG_POSTS;
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('display_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_BLOG_POSTS;
    }

    return data as BlogPost[];
  } catch (err) {
    console.warn('Error fetching blog posts from Supabase, using local defaults:', err);
    return INITIAL_BLOG_POSTS;
  }
}
