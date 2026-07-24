-- ==========================================
-- Enable Row Level Security
-- ==========================================

alter table public.profiles enable row level security;
alter table public.scripts enable row level security;
alter table public.likes enable row level security;
alter table public.comments enable row level security;
alter table public.followers enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.notifications enable row level security;
alter table public.messages enable row level security;

-- ==========================================
-- Profiles
-- ==========================================

create policy "Profiles are viewable by everyone"
on public.profiles
for select
using (true);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id);

-- ==========================================
-- Scripts
-- ==========================================

create policy "Scripts are viewable by everyone"
on public.scripts
for select
using (true);

create policy "Users can create scripts"
on public.scripts
for insert
with check (auth.uid() = scribe_id);

create policy "Users can update their own scripts"
on public.scripts
for update
using (auth.uid() = scribe_id);

create policy "Users can delete their own scripts"
on public.scripts
for delete
using (auth.uid() = scribe_id);

-- ==========================================
-- Comments
-- ==========================================

create policy "Comments are public"
on public.comments
for select
using (true);

create policy "Users can create comments"
on public.comments
for insert
with check (auth.uid() = scribe_id);

-- ==========================================
-- Likes
-- ==========================================

create policy "Likes are public"
on public.likes
for select
using (true);

create policy "Users can like"
on public.likes
for insert
with check (auth.uid() = scribe_id);

create policy "Users can unlike"
on public.likes
for delete
using (auth.uid() = scribe_id);