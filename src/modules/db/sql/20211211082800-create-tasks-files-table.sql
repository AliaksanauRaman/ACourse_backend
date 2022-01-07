CREATE TABLE IF NOT EXISTS public.tasks_files (
  task_id UUID NOT NULL,

  CONSTRAINT fk_tasks_files_tasks
		FOREIGN KEY(task_id)
			REFERENCES public.tasks(id)
			ON UPDATE CASCADE
			ON DELETE CASCADE
) INHERITS (public.abstract_files);

ALTER TABLE public.tasks_files OWNER TO kppnohzpjwrwxs;
