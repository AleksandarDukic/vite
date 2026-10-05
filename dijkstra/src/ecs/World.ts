import { ComponentType } from "../models/ComponentTypes";
import type { MessagingService } from "../message-bus/Types/Bus";
import type { Component } from "./interfaces/Component.Inteface"
import type { System } from "./interfaces/System.Interface"
import type { World } from "./interfaces/World.Inteface"
import { createGridCell } from "../game/factories/GridCellFactory";
import type { Position } from "../models/Position";
import type { GridCell } from "../models/GridCell";
import { gridFactory } from "../game/factories/GridFactory";

export function createWorld(messageBus: MessagingService, canvasWidth: number, canvasHeight: number): World {
    let nextEntityId = 0;
    let bus: MessagingService = messageBus;
    const entities = new Set<number>();
    const components = new Map();
    const systems: System[] = [];
    // GRID
    let cellSize = 40;
    canvasWidth;
    canvasHeight;

    let grid = new Map();

    const world: World = {
        getCellSize: function () {
            return cellSize;
        },
        getCanvasWidth: function () {
            return canvasWidth;
        },
        getCanvasHeight: function () {
            return canvasHeight;
        },
        createEntity: function (): number {
            const id = nextEntityId++;
            entities.add(id);
            return id;
        },
        destroyEntity: function (entity: number): void {
            entities.delete(entity);
            for (const componentMap of components.values()) {
                componentMap.delete(entity);
            };
        },
        getEntities(): Set<number> {
            return entities;
        },
        addComponent: function (entity: number, componentType: ComponentType, component: Component): void {
            const type = componentType;
            if (!components.has(type)) {
                components.set(type, new Map());
            };
            components.get(type).set(entity, component);
        },
        removeComponent: function (entity: number, componentType: ComponentType): void {
            const componentMap = components.get(componentType);
            if (componentMap) {
                componentMap.delete(entity);
            };
        },
        getComponent: function (entity: number, componentType: ComponentType): Component {
            const componentMap = components.get(componentType);
            return componentMap ? componentMap.get(entity) : undefined;
        },
        hasComponent: function (entity: number, component: Component): boolean {
            throw new Error("Function not implemented.");
        },
        addSystem: function (system: System): void {
            systems.push(system);
        },
        update: function (deltaTime: number): void {
            for (const system of systems) {
                system.update(this, deltaTime);
            }
        },
        attachBus(bus: MessagingService) {
            bus = bus;
        },
        getBus(): MessagingService {
            return bus;
        },

        addTennantToGrid(entity: number, position: Position) {
            grid.get(position.x).get(position.y).tennants.push(entity);
        },

        removeEntityFromGrid(entity: number, position: Position) {
            const tennats = grid.get(position.x).get(position.y).tennants as number[];
            const filteredTennats = tennats.filter(x => x != entity);
            grid.get(position.x).get(position.y).tennants = filteredTennats;
        },
        logComponents: function (): void {
            console.log(components);
            console.log(grid);
        },
        getCellEntity: function (x: number, y: number): number {
            return grid.get(x).get(y).host;
        }
    }

    grid = gridFactory().createGrid(world);

    return world;
}
