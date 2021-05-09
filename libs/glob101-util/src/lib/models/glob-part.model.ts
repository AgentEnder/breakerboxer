export interface GlobPart {
  token: string;
  description: string;
  innerParts: GlobPart[];
}
