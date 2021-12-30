CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  PRIMARY KEY(id)
);

ALTER TABLE public.users OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_user_mofidied_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();