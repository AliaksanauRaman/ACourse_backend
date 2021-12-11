CREATE TABLE IF NOT EXISTS public.lessons_files (
  lesson_id UUID NOT NULL,

  CONSTRAINT fk_lessons_files_lessons
		FOREIGN KEY(lesson_id)
			REFERENCES public.lessons(id)
			ON UPDATE CASCADE
			ON DELETE CASCADE
) INHERITS (public.abstract_files);

ALTER TABLE public.lessons_files OWNER TO kppnohzpjwrwxs;
