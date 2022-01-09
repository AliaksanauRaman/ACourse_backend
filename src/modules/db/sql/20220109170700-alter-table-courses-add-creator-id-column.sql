ALTER TABLE public.courses
ADD COLUMN creator_id INTEGER NOT NULL REFERENCES public.users(id);
