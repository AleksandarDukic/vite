import type { ComponentType } from "./ComponentTypes";

export interface RenderSystemConfig {
    ctx: CanvasRenderingContext2D,
    componentType: ComponentType,
    backgroundColor?: string,
    globalAlpha?: number,
    isFrontCanvas?: boolean;
}
