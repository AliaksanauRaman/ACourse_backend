export type Course = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly wantToImprove: boolean;
  readonly createdAt: Date; // TODO: Check
  readonly modifiedAt: Date; // TODO: Check
};
