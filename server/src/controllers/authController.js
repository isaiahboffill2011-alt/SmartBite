import { supabaseClient } from '../utils/supabaseClient.js';

const createProfileFallback = async (userId, fullName, email) => {
  if (!userId) return;

  const { error } = await supabaseClient.from('profiles').upsert({
    id: userId,
    full_name: fullName || null,
    email: email || null,
    preferences: {},
  });

  if (error) {
    console.error('Profile fallback error:', error.message);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const { data, error } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });

    if (error) {
      const message = error.message || 'Signup failed';
      return res.status(400).json({ success: false, error: message });
    }

    if (data?.user) {
      await createProfileFallback(data.user.id, name, email);
    }

    return res.status(201).json({ success: true, data: { user: data.user } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return next({ status: 400, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const refreshSession = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const { data, error } = await supabaseClient.auth.refreshSession({ refresh_token: refreshToken });
    if (error) return next({ status: 400, message: error.message });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
