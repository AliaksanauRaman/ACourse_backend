CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT public.uuid_generate_v4() NOT NULL,
  lesson_id UUID NOT NULL,
  title VARCHAR(60) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  PRIMARY KEY(id),

  CONSTRAINT fk_tasks_lessons
    FOREIGN KEY(lesson_id)
      REFERENCES public.lessons(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE
);

ALTER TABLE public.tasks OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_task_modified_at
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();
