import { getSupabase } from '../lib/supabase';
import { Event, Team, Stadium } from '../types';

export const supabaseService = {
  async getEvents() {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data as Event[];
  },

  async getTeams() {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data as Team[];
  },

  async getStadiums() {
    const supabase = getSupabase();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('stadiums')
      .select('*');
    
    if (error) throw error;
    return data as Stadium[];
  }
};
