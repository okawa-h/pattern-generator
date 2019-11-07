export const increment = ({ commit }, val = 1) => {
  commit("increment", val);
};

export const updateColumnLength = ({ commit }, val = 10) => {
  commit("updateColumnLength", val);
};

export const updateRowLength = ({ commit }, val = 10) => {
  commit("updateRowLength", val);
};
