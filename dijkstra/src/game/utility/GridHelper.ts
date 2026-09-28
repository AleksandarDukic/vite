import type { IWorld } from "../../ecs/interfaces/World.Inteface";
import type { Position } from "../../models/Position";

export function getCellEntityFromPosition(postion: Position, world: IWorld): number {
    let cellSize = world.getCellSize();
    let cellX = postion.x - postion.x % cellSize;
    let cellY = postion.y - postion.y % cellSize;
    console.log(cellX, cellY)
    console.log(world.getCellEntity(cellX, cellY));
    return world.getCellEntity(cellX, cellY);
}

export function getNeighbourCellEntitiesFromCell(entity: number) {

}

export function getCellPositionFromPosition(cellSize: number, position: Position): Position {

    let cellX = position.x - position.x % cellSize;
    let cellY = position.y - position.y % cellSize;
    console.log(cellX, cellY)

    return { x: cellX, y: cellY };
}

export function roundByCellSize(length: number, cellSize: number) {
    return length - length % cellSize;
}