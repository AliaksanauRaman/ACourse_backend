CREATE TABLE IF NOT EXISTS public.permissions (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  PRIMARY KEY(id)
);

ALTER TABLE public.permissions OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_permission_modified_at
BEFORE UPDATE ON public.permissions
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();
