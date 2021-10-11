export type CourseDbRecord = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly want_to_improve: boolean;
  readonly created_at: Date; // TODO: Check
  readonly modified_at: Date; // TODO: Check
};
