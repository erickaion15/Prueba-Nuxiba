import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setUserTodosOrdenado } from '../Controlador/actions';
import UsuarioController from "../Controlador/Controlador";
import { Button, Header, List, Segment, Table } from 'semantic-ui-react';

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
    setUserPosts([]); 
    setUserTodos([]); 
  };

  const handlePostsClick = async () => {
    if (!selectedUser) {
      return; 
    }
    try {
      // Obtener los posts del usuario seleccionado
      const userPostsData = await UsuarioController.getUserPosts(selectedUser.id);
  
      // Actualizar el estado con los nuevos posts del usuario
      setUserPosts(userPostsData);
      setUserTodos([]); // Limpiar los todos
    } catch (error) {
      console.error('Error al obtener los posts del usuario:', error);
      setUserPosts([]); // Limpiar los posts en caso de error
    }
  };

  const handleTodosClick = async () => {
    if (!selectedUser) {
      return; 
    }
    try {
      // Obtener los todos del usuario seleccionado
      const userTodosData = await UsuarioController.getUserTodos(selectedUser.id);
  
      // Ordenar los todos antes de asignarlos al estado
      const todosOrdenados = userTodosData.slice().sort((a, b) => b.id - a.id);
  
      // Actualizar el estado local con los todos ordenados y limpiar los posts
      setUserTodos(todosOrdenados);
      setUserPosts([]); // Limpiar los posts
      
      dispatch(setUserTodosOrdenado(todosOrdenados));
    } catch (error) {
      console.error('Error al obtener los todos del usuario:', error);
      setUserTodos([]); 
    }
  };

  return (
    <Segment padded>
      <Header as='h2'>Lista de Usuarios</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id} onClick={() => handleUserSelect(user)}>
              <Table.Cell>{user.id}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {selectedUser && (
        <Segment>
          <Header as='h2'>Información del Usuario Seleccionado</Header>
          <p>Id: {selectedUser.id}</p>
          <p>Nombre: {selectedUser.name}</p>
          <p>Nombre de usuario: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <Button.Group>
            <Button onClick={handlePostsClick}>Mostrar Posts</Button>
            <Button onClick={handleTodosClick}>Mostrar Todos</Button>
          </Button.Group>
        </Segment>
      )}

      {userPosts.length > 0 && (
        <Segment>
          <Header as='h3'>Posts del Usuario</Header>
          <List>
            {userPosts.map(post => (
              <List.Item key={post.id}>
                <Header as='h4'>{post.title}</Header>
                <p>{post.body}</p>
                <Header as='h3'>Comentarios:</Header>
                <List>
                  {post.comments && post.comments.map(comment => (
                    <List.Item key={comment.id}>
                      <p>{comment.name}</p>
                      <p>{comment.email}</p>
                      <p>{comment.body}</p>
                    </List.Item>
                  ))}
                </List>
              </List.Item>
            ))}
          </List>
        </Segment>
      )}

      {userTodos.length > 0 && (
        <Segment>
          <Header as='h3'>Todos del Usuario</Header>
          <List>
            {userTodos.map(todo => (
              <List.Item key={todo.id}>{todo.title}</List.Item>
            ))}
          </List>
        </Segment>
      )}
    </Segment>
  );
};

export default App;
