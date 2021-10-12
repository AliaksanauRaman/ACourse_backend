export type Course = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly wantToImprove: boolean;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};
