<template lang="pug">
  .result
    .result-inner
      .result-sample
        p.title Preview
        .result-sample-content(:style="{ 'background-image':`url(${result})` }")
      .result-code
        p.title Base64
        .result-code-content: textarea(:value="result")
    .result-download: button(@click="onDownload") download
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["columnLength", "rowLength"])
  },
  data() {
    return {
      result: "data:image/png;base64,"
    };
  },
  methods: {
    onDownload() {
      this.loadImage(this.result).then(image => {
        const anchor = document.createElement("a");
        anchor.download = "image.png";
        anchor.href = image.src;
        anchor.click();
      });
    },
    setResult(glidList) {
      const createCanvas = document.createElement("canvas");
      const createContext = createCanvas.getContext("2d");
      createCanvas.width = this.columnLength;
      createCanvas.height = this.rowLength;

      for (let x = 0; x < this.columnLength; x++) {
        for (let y = 0; y < this.rowLength; y++) {
          if (_.has(glidList[x][y], "color")) {
            createContext.fillStyle = glidList[x][y].color;
            createContext.fillRect(x, y, 1, 1);
          }
        }
      }

      this.result = createCanvas.toDataURL("image/png");
    },
    loadImage(src) {
      return new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = src;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.result {
  > * {
    margin-bottom: 15px;
  }
  &-inner {
    display: flex;
    justify-content: space-between;
  }
  &-sample {
    width: calc(50% - 10px);
    &-content {
      height: 86px;
      border: 2px solid $gray;
      background-repeat: repeat;
      box-sizing: border-box;
    }
  }
  &-code {
    width: calc(50% - 10px);
    &-content {
      display: flex;
    }
    textarea {
      width: 100%;
      height: 60px;
      padding: 1em;
      border: 2px solid $gray;
      resize: none;
    }
  }
  &-download {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10.5em;
      height: 2.8em;
      border: 2px solid $font;
      border-radius: 3px;
      background-color: $font;
      color: #fff;
      font-size: 10px;
      &:hover {
        color: $font;
        background-color: #fff;
      }
    }
  }
}
</style>
