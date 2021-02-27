export interface WorkspaceContext {
  ctx: CanvasRenderingContext2D;
  grid: GridSettings;
  angle: AngleSnapSettings;
}

export interface SnapSettings {
  gridSettings: GridSettings;
  angleSnapSettings: AngleSnapSettings;
}

export const compareSnapSettings = (a: SnapSettings, b: SnapSettings) =>
  a.gridSettings.snap === b.gridSettings.snap &&
  a.gridSettings.gridSizeX === b.gridSettings.gridSizeX &&
  a.gridSettings.gridSizeY === b.gridSettings.gridSizeY &&
  a.angleSnapSettings.snap === b.angleSnapSettings.snap &&
  a.angleSnapSettings.angles === b.angleSnapSettings.angles;

export interface GridSettings {
  gridSizeX: number;
  gridSizeY: number;
  displayGrid: boolean;
  snap: boolean;
}

export interface AngleSnapSettings {
  angles: number[];
  snap: boolean;
}
