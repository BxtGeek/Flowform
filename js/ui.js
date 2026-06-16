// Flowform Pro
// UI Controller

window.FlowformUI = {

  updateLabels() {

    const pairs = [

      ["lines","linesValue"],
      ["amp","ampValue"],
      ["freq","freqValue"],
      ["stroke","strokeValue"]

    ];

    pairs.forEach(
      ([input,label]) => {

        const inputEl =
          document.getElementById(
            input
          );

        const labelEl =
          document.getElementById(
            label
          );

        if(
          inputEl &&
          labelEl
        ){

          labelEl.textContent =
            inputEl.value;

        }

      }
    );

  },

  randomize() {

    document
      .getElementById("lines")
      .value =
      20 +
      Math.floor(
        Math.random()*60
      );

    document
      .getElementById("amp")
      .value =
      50 +
      Math.floor(
        Math.random()*250
      );

    document
      .getElementById("freq")
      .value =
      2 +
      Math.floor(
        Math.random()*12
      );

    document
      .getElementById("stroke")
      .value =
      1 +
      Math.floor(
        Math.random()*8
      );

    const colors = [

      "#ffffff",
      "#00ffcc",
      "#4fffb0",
      "#ffcc00",
      "#8ec5ff"

    ];

    document
      .getElementById(
        "lineColor"
      ).value =

      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    this.updateLabels();

    renderWallpaper();

  },

  bindControls() {

    const controls =

      document.querySelectorAll(
        "input,select"
      );

    controls.forEach(
      control => {

        control.addEventListener(
          "input",
          () => {

            this.updateLabels();

            renderWallpaper();

          }
        );

      }
    );

  },

  bindButtons() {

    const randomBtn =
      document.getElementById(
        "randomize"
      );

    const shareBtn =
      document.getElementById(
        "shareBtn"
      );

    if(randomBtn){

      randomBtn.addEventListener(
        "click",
        () =>
          this.randomize()
      );

    }

    if(shareBtn){

      shareBtn.addEventListener(
        "click",
        () =>
          FlowformShare
            .copyShareURL()
      );

    }

  },

  bindPresetCards() {

    const cards =

      document.querySelectorAll(
        "[data-preset]"
      );

    cards.forEach(card => {

      card.addEventListener(
        "click",
        () => {

          const preset =

            card.dataset.preset;

          applyPreset(
            preset
          );

        }
      );

    });

  },

  init() {

    this.updateLabels();

    this.bindControls();

    this.bindButtons();

    this.bindPresetCards();

  }

};
