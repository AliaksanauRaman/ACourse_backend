CREATE TYPE LESSON_TYPE AS ENUM ('lecture', 'practice');

CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT public.uuid_generate_v4() NOT NULL,
  course_id UUID NOT NULL,
  title VARCHAR(60) NOT NULL,
  type LESSON_TYPE NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
	modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  PRIMARY KEY(id),

  CONSTRAINT fk_lessons_courses
    FOREIGN KEY(course_id)
      REFERENCES public.courses(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE
);

ALTER TABLE public.lessons OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_lesson_modified_at
BEFORE UPDATE ON lessons
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();
