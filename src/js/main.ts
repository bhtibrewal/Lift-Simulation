import { Direction, State, TFloor, TLift } from "./types";
import { Lift } from "./utils";
import react from "./react";
const { createElement } = react;
// import { Direction } from "./types";
//constants
const speedOfLift: number = 2;
const doorOpenSpeed = 2500;
const heightOfFloors = 140;

let numOfFloors = 0;
let numOfLifts = 1;

document.querySelector("form").onsubmit = (e) => {
  e.preventDefault();
  numOfFloors = Number(
    (document.getElementById("no_of_floors") as HTMLInputElement).value
  );
  numOfLifts = Number(
    (document.getElementById("no_of_lift") as HTMLInputElement).value
  );
  //   createLifts()
  createFloors(numOfFloors);
  //   console.log(numOfFloors, numOfLifts);
};
const floorEl = document.querySelector(".floor");
const createFloors = (numOfFloors) => {
  const buildingEl = document.querySelector(".building");

  for (let i = 1; i < numOfFloors; i++) {
    const floor = createElement("div", { class: "floor", id: "1" }, [
      createElement("div", { class: "btn-container" }, [
        createElement("div", { class: "btn btn-up fa fa-arrow-up" }, ""),
        createElement("div", { class: "btn btn-down fa fa-arrow-down" }, ""),
      ]),
    ]);

    buildingEl.appendChild(floor);
  }
};

const createLifts = () => {};

const floors: TFloor[] = [];
const lifts: TLift[] = [];
const direction: Direction = Direction.Up;
const state: State = State.Idle;
const lift: TLift = new Lift("123", direction, state);
console.log(lift);
const liftEl = document.getElementsByClassName(
  "lift"
) as HTMLCollectionOf<HTMLElement>;

const submit = () => {};

setTimeout(() => {
  if (liftEl.length) {
    liftEl[0].style.transitionDuration = `${speedOfLift}s`;
    liftEl[0].style.top = "140px";
    liftEl[0].classList.toggle("open");
    console.log(liftEl[0].classList);
  }
}, doorOpenSpeed);
