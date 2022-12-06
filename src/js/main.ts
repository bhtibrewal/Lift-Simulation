import { Direction, State, TFloor, TLift } from "./types";
import { Lift } from "./utils";
import react, { render } from "./react";
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
  const lifts = createLifts(numOfLifts);
  createFloors(numOfFloors, lifts);
  //   console.log(numOfFloors, numOfLifts);
};
const floorEl = document.querySelector(".floor");
// floorEl.setAttribute("onclick", ()=>{})

const createFloors = (numOfFloors, lifts) => {
  const buildingEl = document.querySelector(".building");

  for (let i = numOfFloors; i >= 1; i--) {
    const floor = createElement(
      "div",
      {
        class: "floor",
        id: i,
        onclick: (e) => {
          console.log(e.target, i);
        },
      },
      [
        createElement("div", { class: "btn_container" }, [
          createElement("h3", { class: "floor_no" }, [`Floor ${i}`]),
          i !== numOfFloors &&
            createElement("div", {
              class: "btn btn_up fa fa-arrow-up",
            }),
          i !== 1 &&
            createElement("div", { class: "btn btn_down fa fa-arrow-down" }),
        ]),
      ]
    );

    if (i == 1) floor.children.push(...lifts);

    render(floor, buildingEl);
  }
};
const createLifts = (numOfLifts) => {
  const lifts = Array(numOfLifts)
    .fill(0)
    .map((_, i) => {
      return createElement("div", { class: "lift", id: i }, [
        createElement("div", { class: "door_left" }),
        createElement("div", { class: "door_right" }),
      ]);
    });
  return lifts;
};
createFloors(6, createLifts(6));

const floors: TFloor[] = [];
const lifts: TLift[] = [];
const direction: Direction = Direction.Up;
const state: State = State.Idle;
const lift: TLift = new Lift("123", direction, state);
console.log(lift);
const liftEl = document.getElementsByClassName(
  "lift"
) as HTMLCollectionOf<HTMLElement>;

setTimeout(() => {
  if (liftEl.length) {
    liftEl[0].classList.toggle("open");
    console.log(liftEl[0].classList);
  }
}, doorOpenSpeed);

const moveLiftToFloor = () => {
  liftEl[0].style.transitionDuration = `${speedOfLift}s`;
  liftEl[0].style.top = "-140px";
};
