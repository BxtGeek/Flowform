// Flowform Pro
// Renderer

window.FlowformRenderer = {

  svg: null,

  init() {

    this.svg =
      document.getElementById(
        "wallpaper"
      );

    if (!this.svg) {
      console.error(
        "SVG #wallpaper not found"
      );
    }
  },

  getResolution() {

    const preset =
      document.getElementById(
        "preset"
      )?.value || "4k";

    switch (preset) {

      case "1080p":
        return {
          width: 1920,
          height: 1080
        };

      case "1440p":
        return {
          width: 2560,
          height: 1440
        };

      case "5k":
        return {
          width: 5120,
          height: 2880
        };

      case "8k":
        return {
          width: 7680,
          height: 4320
        };

      case "phone":
        return {
          width: 1440,
          height: 3120
        };

      case "tablet":
        return {
          width: 2048,
          height: 2732
        };

      default:
        return {
          width: 3840,
          height: 2160
        };
    }

  },

  clear() {

    while (
      this.svg.firstChild
    ) {
      this.svg.removeChild(
        this.svg.firstChild
      );
    }

  },

  createSvgElement(name) {

    return document.createElementNS(
      "http://www.w3.org/2000/svg",
      name
    );

  },

  applyBackground() {

    const bg =
      document.getElementById(
        "bgColor"
      )?.value || "#000";

    this.svg.style.background =
      bg;

  },

  render() {

    const {
      width,
      height
    } =
      this.getResolution();

    this.svg.setAttribute(
      "viewBox",
      `0 0 ${width} ${height}`
    );

    this.clear();

    this.applyBackground();

    const lines =
      parseInt(
        document.getElementById(
          "lines"
        )?.value || 40
      );

    const amplitude =
      parseFloat(
        document.getElementById(
          "amp"
        )?.value || 100
      );

    const frequency =
      parseFloat(
        document.getElementById(
          "freq"
        )?.value || 5
      );

    const strokeWidth =
      parseFloat(
        document.getElementById(
          "stroke"
        )?.value || 2
      );

    const lineColor =
      document.getElementById(
        "lineColor"
      )?.value || "#fff";

    const style =
      document.getElementById(
        "style"
      )?.value || "stroke";

    const spacing =
      height / lines;

    for (
      let i = 0;
      i < lines;
      i++
    ) {

      const y =
        i * spacing;

      const points =
        createFlowLine({

          y,

          width,

          amplitude,

          frequency,

          noiseScale: 0.002,

          noiseStrength: 120

        });

      if (
        style === "ribbon"
      ) {

        const poly =
          this.createSvgElement(
            "polygon"
          );

        poly.setAttribute(
          "points",
          pointsToRibbon(
            points,
            strokeWidth * 4
          )
        );

        poly.setAttribute(
          "fill",
          lineColor
        );

        this.svg.appendChild(
          poly
        );

      } else {

        const path =
          this.createSvgElement(
            "path"
          );

        path.setAttribute(
          "d",
          pointsToPath(points)
        );

        path.setAttribute(
          "fill",
          "none"
        );

        path.setAttribute(
          "stroke",
          lineColor
        );

        path.setAttribute(
          "stroke-width",
          strokeWidth
        );

        path.setAttribute(
          "stroke-linecap",
          "round"
        );

        path.setAttribute(
          "stroke-linejoin",
          "round"
        );

        this.svg.appendChild(
          path
        );

      }

    }

  }

};

window.renderWallpaper =
function () {

  FlowformRenderer.render();

};

window.addEventListener(
  "DOMContentLoaded",
  () => {

    FlowformRenderer.init();

    FlowformRenderer.render();

  }
);
