import type { World } from "../../ecs/interfaces/World.Inteface";
import { ComponentType } from "../../models/ComponentTypes";
import type { Position } from "../../models/Position";
import { createGridCell } from "./GridCellFactory";

export const gridFactory = () => {



    return {
        createGrid: (world: World) => {
            const grid = new Map();
            const canvasWidth = world.getCanvasWidth();
            const canvasHeight = world.getCanvasHeight();
            const cellSize = world.getCellSize()
            for (let i = 0; i < canvasWidth; i += cellSize) {
                grid.set(i, new Map());
                for (let j = 0; j < canvasHeight; j += cellSize) {

                    let gridCell = createGridCell(world, { x: i, y: j } as Position, ComponentType.BackGraphic);
                    grid.get(i).set(j, gridCell);
                    
                }
            }
            return grid;
        }



    }
}