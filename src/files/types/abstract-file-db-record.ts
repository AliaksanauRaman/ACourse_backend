export type AbstractFileDbRecord = {
  readonly id: string;
  readonly original_name: string;
  readonly generated_name: string;
  readonly mime_type: string;
  readonly size: number;
  readonly created_at: Date;
};
