import usuarios from "../Modelo/usuarios";

const API_URL = 'https://jsonplaceholder.typicode.com/';


const UsuarioController = {
  getUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      return data.slice(0, 10).map(user => {
        return new usuarios(
          user.id,
          user.name,
          user.username,
          user.email,
          
        );
      });
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return [];
    }
  },

  //fUNCION para obtener post con comentarios 
  getUserPosts: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/posts?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los posts del usuario');
      }
  
      // Convertir la respuesta a formato JSON
      const posts = await response.json();
  
      // Para cada post, obtener los comentarios asociados
      const PostConComentarios = [];
      for (const post of posts) {
        const commentResponse = await fetch(`${API_URL}/posts/${post.id}/comments`);
        if (!commentResponse.ok) {
          throw new Error('Error al obtener los comentarios del post');
        }
        const comments = await commentResponse.json();
        PostConComentarios.push({ ...post, comments }); // Anidar los comentarios dentro del post
      }
  
      return PostConComentarios;
    } catch (error) {
      console.error('Error al obtener los posts del usuario:', error);
      return [];
    }
  },
  
  //Función para obtener a los usuarios 
  getUserTodos: async(userId) => {
    try{
      const response = await fetch(`${API_URL}/todos?userId=${userId}`);
      if(!response.ok){
        throw new Error('Error al obtener todos los posts del usuario');
      }
      return response;
    } catch(error){
      console.error('Error no se pudo obtener todos los post:', error);
    }
  }
};

export default UsuarioController;


