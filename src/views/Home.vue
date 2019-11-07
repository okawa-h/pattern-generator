<template lang="pug">
  .home
    .inner
      p.title Board
      .board(ref="board")
        .board-inner
          canvas(ref="canvas" @click="onDraw")
      TheSetting(
        ref="setting"
        :maxLength="maxLength"
        @setupBoard="setupBoard"
      )
      TheResult(ref="result")
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

import { Chrome } from "vue-color";
import TheResult from "@/components/TheResult.vue";
import TheSetting from "@/components/TheSetting.vue";

export default {
  name: "home",
  components: {
    TheResult,
    TheSetting,
    "chrome-picker": Chrome
  },
  data() {
    return {
      context: null,
      glidList: []
    };
  },
  computed: {
    ...mapState(["columnLength", "rowLength"]),
    frameSize: () => 780,
    maxLength: () => 30
  },
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
    this.setupBoard();
  },
  methods: {
    setupBoard() {
      this.setCanvasSize();
      this.drawGridLine();
      this.setGlidList();
    },
    onDraw(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      const color = this.$refs.setting.getColor();
      this.context.fillStyle = color;

      for (let indexX = 0; indexX < this.glidList.length; indexX++) {
        const glidListX = this.glidList[indexX];
        const indexY = _.findIndex(glidListX, o => {
          return o.sx < x && o.sy < y && x < o.ex && y < o.ey;
        });
        if (indexY !== -1) {
          const target = glidListX[indexY];
          if (this.$refs.setting.isPaint()) {
            this.context.fillRect(target.sx, target.sy, target.w, target.h);
            glidListX[indexY].color = color;
          } else {
            this.context.clearRect(target.sx, target.sy, target.w, target.h);
            delete glidListX[indexY].color;
          }
        }
      }

      this.$refs.result.setResult(this.glidList);
    },
    setCanvasSize() {
      const maxBoxSize = this.$refs.board.clientWidth / this.maxLength;
      const isVerticalLong = this.columnLength >= this.rowLength;

      let boxSize = isVerticalLong
        ? this.frameSize / this.columnLength
        : this.frameSize / this.rowLength;
      if (boxSize >= maxBoxSize) boxSize = maxBoxSize;

      this.$refs.canvas.width = boxSize * this.columnLength;
      this.$refs.canvas.height = boxSize * this.rowLength;
    },
    setGlidList() {
      this.glidList = [];
      const boxSize = this.$refs.canvas.width / this.columnLength;

      for (let x = 0; x < this.columnLength; x++) {
        this.glidList[x] = [];
        for (let y = 0; y < this.rowLength; y++) {
          this.glidList[x][y] = {
            w: boxSize,
            h: boxSize,
            sx: x * boxSize,
            sy: y * boxSize,
            ex: x * boxSize + boxSize,
            ey: y * boxSize + boxSize
          };
        }
      }
    },
    drawGridLine() {
      const canvasWidth = this.$refs.canvas.width;
      const canvasHeight = this.$refs.canvas.height;
      const boxWidth = canvasWidth / this.columnLength;
      const boxHeight = canvasHeight / this.rowLength;

      this.context.lineWidth = 1;
      this.context.strokeStyle = "#ccc";
      this.context.beginPath();

      for (let i = 1; i < this.columnLength; i++) {
        const x = boxWidth * i;
        this.context.moveTo(x, 0);
        this.context.lineTo(x, canvasHeight);
      }
      for (let i = 1; i < this.rowLength; i++) {
        const y = boxHeight * i;
        this.context.moveTo(0, y);
        this.context.lineTo(canvasWidth, y);
      }

      this.context.stroke();
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  padding: 60px 0;
  font-family: "Press Start 2P", cursive;
  .inner {
    width: 780px;
    margin: 0 auto;
  }
}
.board {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  &-inner {
    border: 2px solid $gray;
  }
  canvas {
    display: block;
    cursor: pointer;
  }
}
</style>
