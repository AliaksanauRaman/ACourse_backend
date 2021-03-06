CREATE OR REPLACE FUNCTION update_modified_at_column()   
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = NOW();
    RETURN NEW;   
END;
$$ language 'plpgsql';
