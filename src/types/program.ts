export type ProgramItem = {
  id: string;
  order: number;
  type: "reading" | "song";
  title: string;
  artist?: string;
  reference?: string;
  content?: string;
  note?: string;
};
