alter table public.site_sections drop constraint if exists site_sections_type_check;
alter table public.site_sections add constraint site_sections_type_check check(type in('hero','about','services','differences','gallery','testimonials','faq','contact'));
