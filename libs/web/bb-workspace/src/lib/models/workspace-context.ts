export interface WorkspaceContext extends SnapSettings {
    ctx: CanvasRenderingContext2D;
}

export interface SnapSettings {
    gridSnapSettings: GridSnapSettings;
    angleSnapSettings: AngleSnapSettings;
}

export interface GridSnapSettings {
    gridSizeX: number;
    gridSizeY: number;
    displayGrid: boolean;
    snap: boolean;
}

export interface AngleSnapSettings {
    angles: number[];
    snap: boolean;
}
