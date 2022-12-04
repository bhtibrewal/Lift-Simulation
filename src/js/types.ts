export enum Direction {
  Up = 1,
  Down = 2,
}
export enum State {
  Moving = 1,
  Idle = 0,
}
export type TFloor = {
  working: Boolean;
  Button: {
    Up: 1;
  };
};

export type TLift = {
  id: String;
  currentDirection: Direction;
  currentState: State;
};

export type TScheduler = {
  request: (sourceFloor: number, directionToGo: Direction) => void;
};
