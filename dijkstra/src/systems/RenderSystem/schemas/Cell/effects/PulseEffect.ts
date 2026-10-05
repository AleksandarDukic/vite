import type { Effect } from "../../../../../components/Graphic/types/Effect";
import type { PositionComponent } from "../../../../../components/Position/PositionComponent.interface";

export function drawPulse(ctx: CanvasRenderingContext2D, postion: PositionComponent, effect: Effect, cellSize: number, entity: number) {
    ctx.save();
    let normalizedTime = ((new Date().getTime() - effect.createdAt.getTime()) % (effect.duration! * 1000)) / (effect.duration! * 1000);
    let fnTime = (1 - Math.abs(2 * normalizedTime - 1));

    const radGrad = ctx.createRadialGradient(postion.x + cellSize / 2, postion.y + cellSize / 2, cellSize/2, postion.x + cellSize / 2, postion.y + cellSize / 2, 5*cellSize * fnTime+1);
    radGrad.addColorStop(0, "transparent");
    radGrad.addColorStop(0.5, '#CDC4AF');
    radGrad.addColorStop(1, "transparent");
    ctx.fillStyle = radGrad;
    ctx.roundRect(postion.x, postion.y, cellSize, cellSize);
    ctx.beginPath();
    ctx.rect(postion.x, postion.y, cellSize, cellSize);
    ctx.clip();
    ctx.fill()
    ctx.clip();
    ctx.restore();
}