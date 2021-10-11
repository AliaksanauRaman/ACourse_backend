export type LectureDbRecord = {
  readonly id: string;
  readonly course_id: string;
  readonly title: string;
  readonly description: string;
  readonly created_at: Date; // TODO: Check
  readonly modified_at: Date; // TODO: Check
};
