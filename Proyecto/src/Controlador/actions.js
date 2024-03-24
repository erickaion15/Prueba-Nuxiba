
export const SET_USERS = 'SET_USERS';
export const SET_USER_POSTS = 'SET_USER_POSTS';
export const SET_USER_TODOS = 'SET_USER_TODOS';
export const SET_USER_TODOS_ORDENADO = 'SET_USER_TODOS_ORDENADO';

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setUserPosts = (posts) => ({
  type: SET_USER_POSTS,
  payload: posts,
});

export const setUserTodos = (todos) => ({
  type: SET_USER_TODOS,
  payload: todos,
});

export const setUserTodosOrdenado = (todos) => ({
  type: SET_USER_TODOS_ORDENADO,
  payload: todos,
});