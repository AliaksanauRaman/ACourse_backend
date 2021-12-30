CREATE TABLE IF NOT EXISTS public.roles_permissions (
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  modified_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT fk_roles_permissions_roles
    FOREIGN KEY(role_id)
      REFERENCES public.roles(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE,

  CONSTRAINT fk_roles_permissions_permissions
    FOREIGN KEY(permission_id)
      REFERENCES public.permissions(id)
      ON UPDATE CASCADE
			ON DELETE CASCADE
);

ALTER TABLE public.roles_permissions OWNER TO kppnohzpjwrwxs;

CREATE TRIGGER update_role_permission_mofidied_at
BEFORE UPDATE ON public.roles_permissions
FOR EACH ROW EXECUTE PROCEDURE update_modified_at_column();