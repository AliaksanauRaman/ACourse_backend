CREATE TABLE IF NOT EXISTS public.users_courses (
  user_id INTEGER NOT NULL,
  course_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT fk_users_courses_users
    FOREIGN KEY(user_id)
      REFERENCES public.users(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE,

  CONSTRAINT fk_users_courses_courses
    FOREIGN KEY(course_id)
      REFERENCES public.courses(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE
);

ALTER TABLE public.users_courses OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_user_course_mofidied_at
BEFORE UPDATE ON public.users_courses
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();