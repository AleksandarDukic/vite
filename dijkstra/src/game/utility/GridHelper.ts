import type { World } from "../../ecs/interfaces/World.Inteface";
import type { Position } from "../../models/Position";

export function getCellEntityFromPosition(postion: Position, world: World): number {
    let cellSize = world.getCellSize();
    let cellX = postion.x - postion.x % cellSize;
    let cellY = postion.y - postion.y % cellSize;
    console.log(cellX, cellY)
    console.log(world.getCellEntity(cellX, cellY));
    return world.getCellEntity(cellX, cellY);
}

export function getNeighbourCellEntitiesFromCell(entity: number) {

}

export function getCellSizeRoundPositionFromPosition(cellSize: number, position: Position): Position {

    let cellX = roundByCellSize(position.x, cellSize);
    let cellY = roundByCellSize(position.y, cellSize);

    return { x: cellX, y: cellY };
}

export function roundByCellSize(length: number, cellSize: number) {
    return length - length % cellSize;
}