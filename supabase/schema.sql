-- ==========================================
-- Telescroll Database Schema
-- ==========================================

create extension if not exists "pgcrypto";

-- ==========================================
-- Profiles
-- ==========================================

create table if not exists public.profiles (

    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    username text unique not null,

    bio text,

    avatar_url text,

    cover_url text,

    verified boolean default false,

    gold_balance integer default 0,

    followers_count integer default 0,

    following_count integer default 0,

    scripts_count integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

-- ==========================================
-- Scripts
-- ==========================================

create table if not exists public.scripts (

    id uuid primary key default gen_random_uuid(),

    scribe_id uuid references public.profiles(id) on delete cascade,

    content text not null,

    image_url text,

    video_url text,

    likes_count integer default 0,

    comments_count integer default 0,

    shares_count integer default 0,

    gold_received integer default 0,

    created_at timestamptz default now()

);

-- ==========================================
-- Likes
-- ==========================================

create table if not exists public.likes (

    id uuid primary key default gen_random_uuid(),

    script_id uuid references public.scripts(id) on delete cascade,

    scribe_id uuid references public.profiles(id) on delete cascade,

    created_at timestamptz default now(),

    unique(script_id, scribe_id)

);

-- ==========================================
-- Comments
-- ==========================================

create table if not exists public.comments (

    id uuid primary key default gen_random_uuid(),

    script_id uuid references public.scripts(id) on delete cascade,

    scribe_id uuid references public.profiles(id) on delete cascade,

    content text not null,

    created_at timestamptz default now()

);

-- ==========================================
-- Followers
-- ==========================================

create table if not exists public.followers (

    id uuid primary key default gen_random_uuid(),

    follower_id uuid references public.profiles(id) on delete cascade,

    following_id uuid references public.profiles(id) on delete cascade,

    created_at timestamptz default now(),

    unique(follower_id, following_id)

);

-- ==========================================
-- Wallet Transactions
-- ==========================================

create table if not exists public.wallet_transactions (

    id uuid primary key default gen_random_uuid(),

    sender_id uuid references public.profiles(id),

    receiver_id uuid references public.profiles(id),

    amount integer not null,

    created_at timestamptz default now()

);

-- ==========================================
-- Notifications
-- ==========================================

create table if not exists public.notifications (

    id uuid primary key default gen_random_uuid(),

    user_id uuid references public.profiles(id) on delete cascade,

    title text,

    message text,

    is_read boolean default false,

    created_at timestamptz default now()

);

-- ==========================================
-- Messages
-- ==========================================

create table if not exists public.messages (

    id uuid primary key default gen_random_uuid(),

    sender_id uuid references public.profiles(id),

    receiver_id uuid references public.profiles(id),

    message text not null,

    created_at timestamptz default now()

);
-- ==========================================
-- Likes Counter
-- ==========================================

create or replace function public.increment_likes_count()
returns trigger
language plpgsql
as $$
begin

    update public.scripts
    set likes_count = likes_count + 1
    where id = new.script_id;

    return new;

end;
$$;

drop trigger if exists like_created on public.likes;

create trigger like_created
after insert on public.likes
for each row
execute function public.increment_likes_count();


create or replace function public.decrement_likes_count()
returns trigger
language plpgsql
as $$
begin

    update public.scripts
    set likes_count = greatest(likes_count - 1, 0)
    where id = old.script_id;

    return old;

end;
$$;

drop trigger if exists like_deleted on public.likes;

create trigger like_deleted
after delete on public.likes
for each row
execute function public.decrement_likes_count();
