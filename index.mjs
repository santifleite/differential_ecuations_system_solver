import { Model } from "simulation";
import { csv } from "simulation-viz-console";

import { writeFileSync } from "fs"

let m = new Model({
    timeStart: 2020,
    timeLength: 100,
    timeUnits: "Years"
});

  // Start with 7 billion people in the "people" stock
let people = m.Stock({
    name: "People",
    initial: 7e9
});

// Use a net growth rate of 2% a year
let growthRate = m.Variable({
name: "Growth Rate",
value: 0.02
});

// The population growth each year is the number of people times the growth rate
// Please note that we refer to the value of other primitives in the model with the
// [name] syntax.
let netGrowth = m.Flow(null, people, {
rate: "[People] * [Growth Rate]"
});
  
  // For the netGrowth flow to be able to reference the growthRate, we need to link the primitives
m.Link(growthRate, netGrowth);

let results = m.simulate();

const result = csv(results, people, 4);
writeFileSync("output.csv", result)