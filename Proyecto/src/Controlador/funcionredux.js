import { SET_USERS, SET_USER_POSTS, SET_USER_TODOS, SET_USER_TODOS_ORDENADO } from './actions';

const initialState = {
  users: [],
  userPosts: [],
  userTodos: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      console.log("Se han recibido los SET_USERS:", action.payload);
      return {
        ...state,
        users: action.payload,
      };

    case SET_USER_POSTS:
      console.log("Se han recibido los SET_USER_POSTS:", action.payload);
      return {
        ...state,
        userPosts: action.payload,
      };

    case SET_USER_TODOS:
      console.log("Se han recibido los SET_USER_TODOS:", action.payload);
      return {
        ...state,
        userTodos: action.payload,
      };

    case SET_USER_TODOS_ORDENADO:
      console.log("Se han recibido los SET_USER_TODOS_ORDENADO:", action.payload);
      // Ordenar los todos por id de mayor a menor
      const todosOrdenados = action.payload.slice().sort((a, b) => b.id - a.id);
      return {
        ...state,
        userTodos: todosOrdenados,
      };

    default:
      return state;
  }
};

export default userReducer;
