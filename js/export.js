// Flowform Pro
// Export Engine

window.FlowformExport = {

  exportSVG() {

    const svg =
      document.getElementById(
        "wallpaper"
      );

    if (!svg) return;

    const serializer =
      new XMLSerializer();

    const source =
      serializer.serializeToString(
        svg
      );

    const blob =
      new Blob(
        [source],
        {
          type:
            "image/svg+xml;charset=utf-8"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "flowform.svg";

    document.body.appendChild(
      a
    );

    a.click();

    document.body.removeChild(
      a
    );

    URL.revokeObjectURL(
      url
    );

  },

  exportPNG() {

    const svg =
      document.getElementById(
        "wallpaper"
      );

    if (!svg) return;

    const serializer =
      new XMLSerializer();

    const svgData =
      serializer.serializeToString(
        svg
      );

    const canvas =
      document.createElement(
        "canvas"
      );

    const viewBox =
      svg
      .getAttribute(
        "viewBox"
      )
      .split(" ");

    const width =
      parseInt(viewBox[2]);

    const height =
      parseInt(viewBox[3]);

    canvas.width =
      width;

    canvas.height =
      height;

    const ctx =
      canvas.getContext("2d");

    const bg =
      document.getElementById(
        "bgColor"
      )?.value || "#000";

    ctx.fillStyle =
      bg;

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    const img =
      new Image();

    img.onload =
      function () {

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const link =
          document.createElement(
            "a"
          );

        link.download =
          "flowform.png";

        link.href =
          canvas.toDataURL(
            "image/png"
          );

        link.click();

      };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(
        unescape(
          encodeURIComponent(
            svgData
          )
        )
      );

  },

  exportJSON() {

    const settings = {

      lines:
        document.getElementById(
          "lines"
        )?.value,

      amplitude:
        document.getElementById(
          "amp"
        )?.value,

      frequency:
        document.getElementById(
          "freq"
        )?.value,

      stroke:
        document.getElementById(
          "stroke"
        )?.value,

      style:
        document.getElementById(
          "style"
        )?.value,

      lineColor:
        document.getElementById(
          "lineColor"
        )?.value,

      bgColor:
        document.getElementById(
          "bgColor"
        )?.value

    };

    const blob =
      new Blob(
        [
          JSON.stringify(
            settings,
            null,
            2
          )
        ],
        {
          type:
            "application/json"
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "flowform-settings.json";

    a.click();

    URL.revokeObjectURL(
      url
    );

  }

};

// Optional button wiring

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const svgBtn =
      document.getElementById(
        "downloadSVG"
      );

    const pngBtn =
      document.getElementById(
        "downloadPNG"
      );

    const jsonBtn =
      document.getElementById(
        "downloadJSON"
      );

    if (svgBtn) {

      svgBtn.addEventListener(
        "click",
        () =>
          FlowformExport.exportSVG()
      );

    }

    if (pngBtn) {

      pngBtn.addEventListener(
        "click",
        () =>
          FlowformExport.exportPNG()
      );

    }

    if (jsonBtn) {

      jsonBtn.addEventListener(
        "click",
        () =>
          FlowformExport.exportJSON()
      );

    }

  }
);
