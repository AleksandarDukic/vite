import type { ComponentType } from "../../models/ComponentTypes";
import type { MessagingService } from "../../message-bus/Types/Bus";
import type { Component } from "./Component.Inteface";
import type { System } from "./System.Interface";
import type { Position } from "../../models/Position";
import type { GridCell } from "../../models/GridCell";

export interface World {
    logComponents(): void;
    getCellSize(): number;
    getCanvasWidth(): number;
    getCanvasHeight(): number;
    createEntity(): number;
    destroyEntity(entity: number): void;
    getEntities(): Set<number>;
    addComponent(entity: number, componentType: ComponentType, component: Component) : void;
    removeComponent(entity: number, component: Component) : void;
    getComponent(entity: number, component: Component) : Component;
    hasComponent(entity: number, component: Component) : boolean;
    addSystem(system: System) : void;
    update(deltaTime: number) : void;
    attachBus(bus: MessagingService): void;
    getBus(): MessagingService;
    //createGrid(): void;
    addTennantToGrid(entity: number, position: Position): void;
    addCellToGrid(i: number, j: number, gridCell: GridCell): void;
    removeEntityFromGrid(entity: number, position: Position): void;
    getCellEntity(x: number, y: number): number;
}