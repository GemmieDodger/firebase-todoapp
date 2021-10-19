import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import firebase from '../Firebase';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const HomeContent = (props) => {
    const [todos, setTodos] = useState([]);
    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(true);

        const onCollectionUpdate = (querySnapshot) => {
            const todos = [];
            querySnapshot.forEach((doc) => {
              const { todo, inprogress } = doc.data();
              todos.push({
                key: doc.id,
                doc, // DocumentSnapshot
                todo,
                inprogress,
              });
            });
            setTodos(todos);
          }
          
        const deleteEntry = (todoId) => {
          firebase.firestore().collection('todos').doc(todoId).delete().then(() => {
            console.log("Document successfully deleted!");
            props.history.push(`/`)
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        }
      
      //check tracker exists + set state
      useEffect(() => {
        const ref = firebase.firestore().collection('todos');
        ref.get().then((doc) => {
          if (doc.exists) {
              setTodos(doc.data());
              setKey(doc.id);
              setIsLoading(false);
          } else {
            console.log("No such document!");
          }
        });
        const unsubscribe = ref.onSnapshot(onCollectionUpdate);
        return () => unsubscribe()
      }, []);
      
          return (
            <div>
                  <div className="container">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <Table striped bordered >
                          <thead>
                            <tr>
                              <th>Todo</th>
                              <th>In progress</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {todos.map(entry =>
                              <tr key={entry.key}> 
                                <td>{entry.todo}</td>
                                <td>{entry.inprogress === 1 ? 'In progress' : 'Outstanding'}</td>                   
                                <td>
                                    <Link to={`/edit/${entry.key}`}><Button variant="primary">Edit</Button></Link>
                                    <Button variant="danger" onClick={deleteEntry.bind(this, entry.key).bind(this, key)}>Delete</Button></td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>   
              </div>
          );
}

export default HomeContent;