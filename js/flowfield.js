// Flowform Pro
// Flow Field Engine

class FlowField {

  constructor(seed = Date.now()) {

    this.seed = seed;

  }

  random(x,y){

    const s =
      Math.sin(
        x * 12.9898 +
        y * 78.233 +
        this.seed
      ) * 43758.5453;

    return s - Math.floor(s);

  }

  smoothstep(t){

    return t * t *
    (3 - 2 * t);

  }

  noise(x,y){

    const x0 =
      Math.floor(x);

    const y0 =
      Math.floor(y);

    const x1 =
      x0 + 1;

    const y1 =
      y0 + 1;

    const sx =
      this.smoothstep(
        x - x0
      );

    const sy =
      this.smoothstep(
        y - y0
      );

    const n00 =
      this.random(x0,y0);

    const n10 =
      this.random(x1,y0);

    const n01 =
      this.random(x0,y1);

    const n11 =
      this.random(x1,y1);

    const ix0 =
      n00 +
      (n10 - n00) * sx;

    const ix1 =
      n01 +
      (n11 - n01) * sx;

    return (
      ix0 +
      (ix1 - ix0) * sy
    );

  }

  fbm(
    x,
    y,
    octaves = 4
  ){

    let value = 0;

    let amp = 0.5;

    let freq = 1;

    for(
      let i=0;
      i<octaves;
      i++
    ){

      value +=
        amp *
        this.noise(
          x*freq,
          y*freq
        );

      freq *= 2;

      amp *= 0.5;

    }

    return value;

  }

  getOffset(
    x,
    y,
    scale,
    strength
  ){

    return (
      this.fbm(
        x*scale,
        y*scale
      ) - 0.5
    ) * strength;

  }

  getAngle(
    x,
    y,
    scale
  ){

    return (
      this.fbm(
        x*scale,
        y*scale
      )
    ) * Math.PI * 2;

  }

}

window.flowField =
  new FlowField();

window.createFlowLine = function({

  y,

  width,

  amplitude,

  frequency,

  noiseScale,

  noiseStrength

}){

  const points = [];

  for(
    let x=0;
    x<=width;
    x+=12
  ){

    const wave =

      Math.sin(
        x *
        0.002 *
        frequency
      ) *

      amplitude;

    const distortion =

      flowField.getOffset(
        x,
        y,
        noiseScale,
        noiseStrength
      );

    points.push({

      x,

      y:
        y +
        wave +
        distortion

    });

  }

  return points;

};

window.pointsToPath =
function(points){

  if(
    !points ||
    points.length < 2
  )
    return "";

  let d =
    `M ${points[0].x} ${points[0].y}`;

  for(
    let i=1;
    i<points.length;
    i++
  ){

    const p =
      points[i];

    d +=
      ` L ${p.x} ${p.y}`;

  }

  return d;

};

window.pointsToRibbon =
function(
  points,
  thickness
){

  const upper = [];
  const lower = [];

  for(
    const p of points
  ){

    upper.push(
      `${p.x},${p.y}`
    );

  }

  for(
    let i=
      points.length-1;
    i>=0;
    i--
  ){

    lower.push(

      `${points[i].x},
      ${points[i].y +
      thickness}`

    );

  }

  return [
    ...upper,
    ...lower
  ].join(" ");

};
