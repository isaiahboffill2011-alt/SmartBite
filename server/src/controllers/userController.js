import { supabaseClient } from '../utils/supabaseClient.js';

export const getProfile = async (req, res, next) => {
  try {
    const { data, error } = await supabaseClient.from('profiles').select('id, email, name, preferences').eq('id', req.user.id).single();
    if (error) return next({ status: 400, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updates = req.body;
    const { data, error } = await supabaseClient.from('profiles').update(updates).eq('id', req.user.id).single();
    if (error) return next({ status: 400, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
