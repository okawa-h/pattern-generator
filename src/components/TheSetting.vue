<template lang="pug">
  .setting
    .setting-size
      p.title Width
      .setting-size-item
        label: input(name="column" type="range" :max="maxLength" min="1" @input="onInput")
        p.setting-size-value {{ columnLength }}px
      p.title Height
      .setting-size-item
        label: input(name="row" type="range" :max="maxLength" min="1" @input="onInput")
        p.setting-size-value {{ rowLength }}px
      p.title Paint Mode
      ul.setting-mode
        li
          label(for="setting-mode-paint")
            p.name Paint
            input#setting-mode-paint(name="paintMode" type="radio" value="paint" v-model="paintMode")
        li
          label(for="setting-mode-eraser")
            p.name Eraser
            input#setting-mode-eraser(name="paintMode" type="radio" value="eraser" v-model="paintMode")
    .setting-colors
      p.title Color
      TheChromePicker(v-model="colors")
</template>

<script>
import { mapState, mapActions } from "vuex";

import { Chrome } from "vue-color";

export default {
  components: { TheChromePicker: Chrome },
  props: ["maxLength"],
  data() {
    return {
      colors: { hex: "#000" },
      paintMode: "paint"
    };
  },
  computed: {
    ...mapState(["columnLength", "rowLength"])
  },
  methods: {
    ...mapActions(["updateColumnLength", "updateRowLength"]),
    onInput(event) {
      const name = event.target.name;
      const value = event.target.value;
      if (name === "column") this.updateColumnLength(value);
      if (name === "row") this.updateRowLength(value);
      this.$emit("setupBoard");
    },
    getColor() {
      return this.colors.hex;
    },
    isPaint() {
      return this.paintMode === "paint";
    }
  }
};
</script>

<style scoped lang="scss">
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: $gray;
  width: 100%;
  height: 2px;
  &:focus,
  &:active {
    outline: none;
  }
  &::-webkit-slider-thumb {
    display: block;
    position: relative;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    border: none;
    width: 12px;
    height: 12px;
    background-color: #333;
    &:hover {
      opacity: 0.8;
    }
  }
}
.setting {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  &-size {
    flex-grow: 1;
    margin-right: 15px;
    &-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    label {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
    &-value {
      width: 5em;
      color: $font;
      font-size: 14px;
      text-align: right;
    }
  }
  &-mode {
    display: flex;
    li {
      display: flex;
      align-items: center;
      + li {
        margin-left: 20px;
      }
      label {
        padding: 8px 10px;
        border: 2px solid $gray;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        .name {
          font-size: 12px;
        }
      }
    }
  }
  &-colors {
    .vc-chrome {
      border: 2px solid $gray;
      box-shadow: none;
    }
  }
}
</style>
