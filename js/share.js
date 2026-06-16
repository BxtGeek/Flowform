// Flowform Pro
// Shareable URLs + Seeds

window.FlowformShare = {

  createShareURL() {

    const params =
      new URLSearchParams();

    const ids = [
      "lines",
      "amp",
      "freq",
      "stroke",
      "style",
      "lineColor",
      "bgColor",
      "preset"
    ];

    ids.forEach(id => {

      const el =
        document.getElementById(id);

      if(el){
        params.set(
          id,
          el.value
        );
      }

    });

    return (
      window.location.origin +
      window.location.pathname +
      "?" +
      params.toString()
    );

  },

  copyShareURL() {

    const url =
      this.createShareURL();

    navigator.clipboard
      .writeText(url)
      .then(() => {

        alert(
          "Share URL copied!"
        );

      });

  },

  loadFromURL() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    params.forEach(
      (value,key) => {

        const el =
          document.getElementById(
            key
          );

        if(el){

          el.value =
            value;

        }

      }
    );

  }

};
