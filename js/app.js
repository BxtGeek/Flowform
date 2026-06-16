// ===================================
// FLOWFORM PRO
// Main App Bootstrap
// ===================================

window.Flowform = {

  version: "1.0.0",

  initTheme() {

    const theme =

      localStorage.getItem(
        "flowform-theme"
      ) ||

      "theme-dark";

    document.body
      .classList.add(
        theme
      );

  },

  initThemeSwitcher() {

    const select =

      document.getElementById(
        "themeSelect"
      );

    if(!select) return;

    select.addEventListener(
      "change",
      e => {

        document.body
          .className =

          e.target.value;

        localStorage.setItem(
          "flowform-theme",
          e.target.value
        );

      }
    );

  },

  initPWA() {

    if(
      "serviceWorker"
      in navigator
    ){

      navigator.serviceWorker
        .register(
          "./sw.js"
        )
        .catch(
          console.error
        );

    }

  },

  initKeyboardShortcuts() {

    document
      .addEventListener(
        "keydown",
        e => {

          if(
            e.key === "r"
          ){

            FlowformUI
              .randomize();

          }

          if(
            e.key === "s" &&
            e.ctrlKey
          ){

            e.preventDefault();

            FlowformExport
              .exportPNG();

          }

        }
      );

  },

  initExportButtons() {

    const pngBtn =
      document.getElementById(
        "downloadPNG"
      );

    const svgBtn =
      document.getElementById(
        "downloadSVG"
      );

    const jsonBtn =
      document.getElementById(
        "downloadJSON"
      );

    if(pngBtn){

      pngBtn.onclick =
        () =>

        FlowformExport
          .exportPNG();

    }

    if(svgBtn){

      svgBtn.onclick =
        () =>

        FlowformExport
          .exportSVG();

    }

    if(jsonBtn){

      jsonBtn.onclick =
        () =>

        FlowformExport
          .exportJSON();

    }

  },

  boot() {

    console.log(
      `Flowform ${this.version}`
    );

    this.initTheme();

    this.initThemeSwitcher();

    this.initKeyboardShortcuts();

    this.initExportButtons();

    this.initPWA();

    FlowformShare
      .loadFromURL();

    FlowformUI
      .init();

    renderWallpaper();

  }

};

window.addEventListener(
  "DOMContentLoaded",
  () => {

    Flowform.boot();

  }
);
