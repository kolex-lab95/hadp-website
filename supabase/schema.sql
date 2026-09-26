create type public.content_status as enum ('draft', 'published');

create table public.activities (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  title_fr text not null, title_en text not null, summary_fr text not null default '', summary_en text not null default '',
  description_fr text not null default '', description_en text not null default '', activity_date date,
  location text, domain text not null, main_image_url text, status public.content_status not null default 'draft',
  featured boolean not null default false, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.gallery_images (
  id uuid primary key default gen_random_uuid(), image_url text not null, caption_fr text, caption_en text,
  alt_fr text not null, alt_en text not null, activity_id uuid references public.activities(id) on delete set null,
  status public.content_status not null default 'draft', sort_order integer not null default 0, created_at timestamptz not null default now()
);
alter table public.activities enable row level security;
alter table public.gallery_images enable row level security;
create policy "Public reads published activities" on public.activities for select using (status = 'published');
create policy "Public reads published gallery" on public.gallery_images for select using (status = 'published');
create policy "Authenticated users manage activities" on public.activities for all to authenticated using (true) with check (true);
create policy "Authenticated users manage gallery" on public.gallery_images for all to authenticated using (true) with check (true);
insert into storage.buckets (id, name, public) values ('hadp-media', 'hadp-media', true) on conflict do nothing;
create policy "Authenticated uploads HADP media" on storage.objects for insert to authenticated with check (bucket_id = 'hadp-media');
create policy "Public reads HADP media" on storage.objects for select using (bucket_id = 'hadp-media');
create policy "Authenticated deletes HADP media" on storage.objects for delete to authenticated using (bucket_id = 'hadp-media');
