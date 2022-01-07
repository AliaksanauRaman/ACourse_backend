CREATE TABLE IF NOT EXISTS public.abstract_files (
  id UUID DEFAULT public.uuid_generate_v4() NOT NULL,
  original_name TEXT NOT NULL,
  generated_name TEXT NOT NULL,
  mime_type VARCHAR(50) NOT NULL,
  size INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,

  PRIMARY KEY(id)
);

ALTER TABLE public.abstract_files OWNER TO kppnohzpjwrwxs;
