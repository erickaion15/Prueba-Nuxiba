import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../Controlador/actions';
import UsuarioController from "../Controlador/Controlador";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await UsuarioController.getUsers();
      dispatch(setUsers(fetchedUsers));
    };
    fetchUsers();
  }, [dispatch]);

  //Funcion para limpiar los datos solicitados anteriormente
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserPosts([]); // Limpiar los posts al seleccionar un nuevo usuario
    setUserTodos([]); // Limpiar los todos al seleccionar un nuevo usuario
  };

  const handlePostsClick = async () => {
    if (!selectedUser) {
      return; // No hay usuario seleccionado, no hacer nada
    }
  
    try {
      // Obtener los posts del usuario seleccionado
      const userPostsData = await UsuarioController.getUserPosts(selectedUser.id);
  
      // Actualizar el estado con los nuevos posts del usuario
      setUserPosts(userPostsData);
    } catch (error) {
      console.error('Error al obtener los posts del usuario:', error);
      setUserPosts([]); // Limpiar los posts en caso de error
    }
  };

  const handleTodosClick = async () => {
    if (!selectedUser) {
      return; // No hay usuario seleccionado, no hacer nada
    }
  
    try {
      // Obtener los todos del usuario seleccionado
      const userTodosResponse = await UsuarioController.getUserTodos(selectedUser.id);
      const userTodosData = await userTodosResponse.json();
  
      // Actualizar el estado con los nuevos todos del usuario
      setUserTodos(userTodosData);
    } catch (error) {
      console.error('Error al obtener los todos del usuario:', error);
      setUserTodos([]); // Limpiar los todos en caso de error
    }
  };

  return (
    <div className="App">
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserSelect(user)}>
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>Información del Usuario Seleccionado</h3>
          <p>Id: {selectedUser.id}</p>
          <p>Nombre: {selectedUser.name}</p>
          <p>Nombre de usuario: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <button onClick={handlePostsClick}>Mostrar Posts</button>
          <button onClick={handleTodosClick}>Mostrar Todos</button>
        </div>
      )}

        {userPosts.length > 0 && (
          <div>
            <h3>Posts del Usuario</h3>
            <ul>
              {userPosts.map(post => (
                <li key={post.id}>
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                  <h5>Comentarios:</h5>
                  <ul>
                    {post.comments && post.comments.map(comment => (
                      <li key={comment.id}>
                        <p>{comment.name}</p>
                        <p>{comment.email}</p>
                        <p>{comment.body}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}


      {userTodos.length > 0 && (
        <div>
          <h3>Todos del Usuario</h3>
          <ul>
            {userTodos.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
