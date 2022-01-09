export type CourseDbRecord = Readonly<{
  id: string;
  title: string;
  description: string;
  want_to_improve: boolean;
  creator_id: number;
  created_at: Date;
  modified_at: Date;
}>;
