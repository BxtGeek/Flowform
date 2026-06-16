// Flowform Pro
// Preset Library

window.FlowformPresets = {

  topo: {
    name: "Topo",
    description: "Topographic contour lines",

    lines: 55,
    amplitude: 90,
    frequency: 5,
    strokeWidth: 2,

    noiseScale: 0.002,
    noiseStrength: 140,

    lineColor: "#ffffff",

    bgType: "solid",
    bgColor: "#000000",

    style: "stroke",
    glow: false
  },

  terrain: {
    name: "Terrain",
    description: "Dense map style",

    lines: 70,
    amplitude: 60,
    frequency: 4,
    strokeWidth: 1,

    noiseScale: 0.003,
    noiseStrength: 220,

    lineColor: "#ffffff",

    bgType: "solid",
    bgColor: "#050505",

    style: "stroke",
    glow: false
  },

  silk: {
    name: "Silk",
    description: "Smooth flowing ribbons",

    lines: 25,
    amplitude: 220,
    frequency: 2,
    strokeWidth: 8,

    noiseScale: 0.0015,
    noiseStrength: 60,

    lineColor: "#ffffff",

    bgType: "gradient",
    bgColor1: "#0f172a",
    bgColor2: "#111827",

    style: "ribbon",
    glow: false
  },

  ocean: {
    name: "Ocean",
    description: "Large wave formations",

    lines: 22,
    amplitude: 260,
    frequency: 3,
    strokeWidth: 3,

    noiseScale: 0.001,
    noiseStrength: 100,

    lineColor: "#8ec5ff",

    bgType: "gradient",
    bgColor1: "#02111d",
    bgColor2: "#033860",

    style: "stroke",
    glow: false
  },

  aurora: {
    name: "Aurora",
    description: "Neon glow waves",

    lines: 35,
    amplitude: 180,
    frequency: 4,
    strokeWidth: 3,

    noiseScale: 0.002,
    noiseStrength: 120,

    lineColor: "#4fffb0",

    bgType: "gradient",
    bgColor1: "#040404",
    bgColor2: "#101820",

    style: "stroke",
    glow: true
  },

  zen: {
    name: "Zen",
    description: "Minimal monochrome",

    lines: 12,
    amplitude: 80,
    frequency: 2,
    strokeWidth: 4,

    noiseScale: 0.001,
    noiseStrength: 30,

    lineColor: "#ffffff",

    bgType: "solid",
    bgColor: "#000000",

    style: "stroke",
    glow: false
  }

};

window.applyPreset = function(name){

  const preset =
    FlowformPresets[name];

  if(!preset) return;

  const setValue = (id,val)=>{
    const el =
      document.getElementById(id);

    if(el)
      el.value = val;
  };

  setValue("lines",preset.lines);
  setValue("amp",preset.amplitude);
  setValue("freq",preset.frequency);
  setValue("stroke",preset.strokeWidth);

  setValue(
    "lineColor",
    preset.lineColor
  );

  if(preset.bgColor)
    setValue(
      "bgColor",
      preset.bgColor
    );

  if(window.renderWallpaper)
    window.renderWallpaper();
};
