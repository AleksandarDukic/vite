import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawFps(ctx: CanvasRenderingContext2D, postion: PositionComponent, fps: number) {
    ctx.fillText(`FPS: ${fps}`, postion.x, postion.y);
}
