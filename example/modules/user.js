export default {
  namespace: 'user',
  state: {
    userId: '',
    token: '',
    company: {},
    bee: {}
  },
  actions: {
    signin(state, { user }) {
      return { ...state, ...user };
    },
    signout() {
      return {};
    },
    company(state, { company }) {
      return { ...state, company };
    },
    bee(state, { company }) {
      return { ...state, bee: company };
    }
  },
  effects: {
    checkLogin(){
      console.log(this);
    }
  }
};
