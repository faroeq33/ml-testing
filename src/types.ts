export type ClassificationResult = (Record<string, number> & {
  label: string;
  confidence: number;
})[];
