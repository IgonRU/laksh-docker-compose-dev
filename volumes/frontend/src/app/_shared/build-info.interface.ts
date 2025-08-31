export interface BuildInfo {
  buildTime: string;
  buildDate: string;
  buildTimestamp: number;
  commitHash: string;
  branch: string;
  lastTag: string;
  version: string;
}
