import type { ComponentType } from "./ComponentTypes";

export interface RenderSystemConfig {
    ctx: CanvasRenderingContext2D,
    graphicType: ComponentType,
    backgroundColor?: string,
    backCanvas?: HTMLCanvasElement,
    frontCanvasContext?: HTMLCanvasElement
}
