import { ComponentType } from "../../models/ComponentTypes";

import { GraphicType } from "../../components/Graphic/types/GraphicType";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { IRenderSystem } from "./RenderSystem.interface";
import { drawPointer } from "./schemas/Pointer/Pointer";
import { drawCell } from "./schemas/Cell/Cell";
import type { GraphicComponent } from "../../components/Graphic/GraphicComponent.interface";
import type { RenderSystemConfig } from "../../models/RenderSystemConfig";

export function createRenderSystem(config: RenderSystemConfig): IRenderSystem {
    let x = 200;
    let y = 100;
    let moveX = 5;
    let moveY = 5

    function drawBall() {
        ctx.save();
        x += moveX;
        y += moveY;
        moveX = x >= ctx.canvas.width ? -1 * moveX : x <= 0 ? -1 * moveX : moveX;
        moveY = y >= ctx.canvas.height ? -1 * moveY : y <= 0 ? -1 * moveY : moveY;
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.restore();
    }

    const {ctx, componentType, backgroundColor, globalAlpha, isFrontCanvas } = config
    const renderSystem: IRenderSystem = {
        update: function (world: IWorld, deltaTime: number) {

            if (backgroundColor) {
                ctx.save();
                ctx.fillStyle = backgroundColor;
                ctx.globalAlpha = globalAlpha ?? 1;
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.restore();
            };

            const entities = entitiesWith(world, [componentType, ComponentType.Position]);
            entities.forEach(entity => {
                const positionComponent = world.getComponent(entity, ComponentType.Position) as PositionComponent;
                const graphicComponent = world.getComponent(entity, componentType) as GraphicComponent
                switch (graphicComponent.type) {
                    case GraphicType.Pointer: {
                        drawPointer(ctx, positionComponent)
                        break;
                    }
                    case GraphicType.Cell: {
                        drawCell(ctx, positionComponent, world.getCellSize())
                        break;
                    }
                }
            });

            // TODO: ovo nije dobro mesto jer za back i main canvas proverava uvek
            if (isFrontCanvas) {
               ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                //drawBall()
            }
        }
    }

    return renderSystem;
}