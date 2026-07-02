-- SmartBite Supabase schema
-- Paste this into the Supabase SQL editor and run it.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  preferences jsonb default '{}'::jsonb,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  ingredients jsonb default '[]'::jsonb,
  instructions text,
  created_at timestamptz default now()
);

create table if not exists public.meal_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  meal_name text not null,
  ingredients jsonb default '[]'::jsonb,
  notes text,
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.favorites enable row level security;
alter table public.meal_history enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can view own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can update own favorites"
  on public.favorites for update
  using (auth.uid() = user_id);

create policy "Users can delete own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

create policy "Users can view own meal history"
  on public.meal_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own meal history"
  on public.meal_history for insert
  with check (auth.uid() = user_id);

create policy "Users can update own meal history"
  on public.meal_history for update
  using (auth.uid() = user_id);

create policy "Users can delete own meal history"
  on public.meal_history for delete
  using (auth.uid() = user_id);
