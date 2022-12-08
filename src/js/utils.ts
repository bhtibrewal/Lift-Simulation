import { Direction, State, } from "./types";

export class Lift {
  constructor(id: string, currentDirection: Direction, currentState: State) {
    this.id = id;
    this.currentDirection = currentDirection;
    this.currentState = currentState;
  }
  id: string;
  currentDirection: Direction;
  currentState: State;
  currentFloor: number = 0;
}

export class Floor {
  constructor(id: number) {
    this.id = id;
  }
  id: number;
  readonly working: Boolean = true;
}
export class Request {
  sourceFloor: number;
  directionToGo: Direction;
}

export class Scheduler {
  requests: Request[] = [];
}
