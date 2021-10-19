import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import './stylesheet.css';
import Button from 'react-bootstrap/Button';

const CreateTodo = props => {
    
    const [state, setState] = useState({
      todo: '',
      inprogress: 0,
    });
  
  const onChange = (e) => {
    state[e.target.name] = e.target.value;
    setState(state);
  }


  const onSubmit = (e) => {
    e.preventDefault();
    const ref = firebase.firestore().collection('todos');
    var {  todo, inprogress } = state;
    ref.add({
      todo,
      inprogress,
    }).then((docRef) => {
      setState({
        todo: '',
        inprogress: 0,
      });
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  const  { todo, inprogress } = state;
   
    return (
      <div>
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-body">
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="title">Add to do:</label>
                      <input type="text" className="form-control" name="todo" defaultValue={todo} onChange={onChange} placeholder="Add Todo" />
                    </div>
                     <Button type="submit" variant="success" >Submit</Button>                  
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
  }


export default CreateTodo;