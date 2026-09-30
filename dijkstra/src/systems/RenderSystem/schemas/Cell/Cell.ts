import type { Effect } from "../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../components/Position/PositionComponent.interface";

export function drawCell(ctx: CanvasRenderingContext2D, postion: PositionComponent, cellSize: number, effects?: Effect[]) {
    ctx.setLineDash([1, 7]);
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#3F63B8"
    ctx.strokeRect(postion.x -.5, postion.y - .5, cellSize, cellSize);
    ctx.restore();
}