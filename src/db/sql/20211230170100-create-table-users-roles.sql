CREATE TABLE IF NOT EXISTS public.users_roles (
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT fk_users_roles_users
    FOREIGN KEY(user_id)
      REFERENCES public.users(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE,

  CONSTRAINT fk_users_roles_roles
    FOREIGN KEY(role_id)
      REFERENCES public.roles(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE
);

ALTER TABLE public.users_roles OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_user_role_mofidied_at
BEFORE UPDATE ON public.users_roles
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();