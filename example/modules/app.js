const defaultTitle = 'sd';

export default {
  namespace: 'app',
  state: {
    title: defaultTitle,
    sidebar: true
  },
  // immutable data
  actions: {
    setTitle(state, { title }) {
      const displayTitle = title ? `${title}-${defaultTitle}` : defaultTitle;
      if (document.title) {
        window.document.title = displayTitle;
      }
      return { ...state, title: displayTitle };
    },
    toggleSidebar(state) {
      return { ...state, sidebar: !state.sidebar };
    },
    clearPath(state) {
      return { ...state, path: null };
    },
    setPath(state, { path }) {
      return { ...state, path };
    }
  },
  // side sffects actions
  effects: {
    async fetchAction({ title }) {
      setTimeout(() => {
        this.setTitle({ title });
      }, 1000 * title);
    }
  }
};
