import { ComponentType } from "../../models/ComponentTypes";
import type { InputComponent } from "../../components/Input/InputComponent.interface";
import type { PointerActionComponent } from "../../components/PointerAction/PointerActionComponent.interface";
import type { PositionComponent } from "../../components/Position/PositionComponent.interface";
import type { World } from "../../ecs/interfaces/World.Inteface";
import { entitiesWith } from "../../ecs/Query";
import type { PointerSystem } from "./PointerSystem.interface";
import { roundByCellSize } from "../../game/utility/GridHelper";
import type { Position } from "../../models/Position";
import { effectFactory as eFactory } from "../../components/Graphic/effectFactory-1";
import type { GraphicComponent } from "../../components/Graphic/GraphicComponent.interface";
import { gridCellAddPulseEffect, gridCellRemoveEffects } from "../../game/factories/GridCellFactory";

export function createPointerSystem(): PointerSystem {



    const pointerSystem: PointerSystem = {
        update: function (world: World, deltaTime: number) {

            const inputEnteties = entitiesWith(world, [ComponentType.Input, ComponentType.Position]);
            if (inputEnteties.length < 1) return;
            const inputEntity = inputEnteties[0]

            const pointerEnteties = entitiesWith(world, [ComponentType.Pointer, ComponentType.PointerAction, ComponentType.Position, ComponentType.CellPosition]);
            pointerEnteties.forEach(pointerEntity => {

                // update Pointer Action
                const inputComponent = world.getComponent(inputEntity, ComponentType.Input) as InputComponent;
                const pointerActionComponent = world.getComponent(pointerEntity, ComponentType.PointerAction) as PointerActionComponent;
                pointerActionComponent.leftClick = inputComponent.leftClick;
                pointerActionComponent.rightClick = inputComponent.rightClick;

                // update Pointer Position
                const inputPositionComponent = world.getComponent(inputEntity, ComponentType.Position) as PositionComponent;
                const positionComponent = world.getComponent(pointerEntity, ComponentType.Position) as PositionComponent;
                positionComponent.x = inputPositionComponent.x;
                positionComponent.y = inputPositionComponent.y;


                // update Pointer Cell Position
                const cellPositionComponent = world.getComponent(pointerEntity, ComponentType.CellPosition) as PositionComponent;
                const oldCellPosition : Position = {x: cellPositionComponent.x, y: cellPositionComponent.y};
                if (
                    Math.abs(positionComponent.x - cellPositionComponent.x) > 40 ||
                    positionComponent.x < cellPositionComponent.x ||
                    Math.abs(positionComponent.y - cellPositionComponent.y) > 40 ||
                    positionComponent.y < cellPositionComponent.y
                ) {
                    world.removeEntityFromGrid(pointerEntity, cellPositionComponent);
                    gridCellRemoveEffects(world, world.getCellEntity(oldCellPosition.x, oldCellPosition.y));
                    // remove effect from cell
                    cellPositionComponent.x = roundByCellSize(positionComponent.x, world.getCellSize());
                    cellPositionComponent.y = roundByCellSize(positionComponent.y, world.getCellSize());
                    world.addTennantToGrid(pointerEntity, cellPositionComponent);
                    
                    // add effect to cell
                    const newCellEntity = world.getCellEntity(cellPositionComponent.x, cellPositionComponent.y);
                    gridCellAddPulseEffect(world, newCellEntity);
                    // const newCellGraphicComponent = world.getComponent(newCellEntity, ComponentType.BackGraphic) as GraphicComponent;
                    // const effect = eFactory().animated(2).after().pulse().repeating().build();
                    // newCellGraphicComponent.effects?.push(effect);                
                }
            });
        }
    }

    return pointerSystem;
}