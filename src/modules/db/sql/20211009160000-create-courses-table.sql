CREATE TABLE IF NOT EXISTS public.courses (
	id UUID DEFAULT public.uuid_generate_v4() NOT NULL,
	title VARCHAR(60) NOT NULL,
	description TEXT NOT NULL,
	want_to_improve BOOLEAN NOT NULL,
	created_at TIMESTAMP DEFAULT NOW() NOT NULL,
	modified_at TIMESTAMP DEFAULT NOW() NOT NULL,
	
	PRIMARY KEY(id)
);

ALTER TABLE public.courses OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_course_modified_at
BEFORE UPDATE ON courses
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();
