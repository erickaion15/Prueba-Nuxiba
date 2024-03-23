
export const SET_USERS = 'SET_USERS';
export const SET_USER_POSTS = 'SET_USER_POSTS';
export const SET_USER_TODOS = 'SET_USER_TODOS';

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