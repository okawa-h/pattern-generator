export const increment = (state, val) => {
  state.count += val;
};

export const updateColumnLength = (state, val) => {
  state.columnLength = val;
};

export const updateRowLength = (state, val) => {
  state.rowLength = val;
};
