CREATE TABLE IF NOT EXISTS public.roles (
  id SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  PRIMARY KEY(id)
);

ALTER TABLE public.roles OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_role_modified_at
BEFORE UPDATE ON public.roles
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();
