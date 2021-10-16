export type AbstractFile = {
  readonly id: string;
  readonly originalName: string;
  readonly generatedName: string;
  readonly mimeType: string;
  readonly size: number;
  readonly createdAt: Date;
};
