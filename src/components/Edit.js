import React, { useState, useEffect } from 'react';
import firebase from '../Firebase';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@restart/ui/esm/Button';
import { Form } from 'react-bootstrap';
import { FloatingLabel } from 'react-bootstrap';

const Edit = props => {
    const [todos, setTodos] = useState([]);
    const [key, setKey] = useState('');
    const [todo, setTodo] = useState('');
    const [inprogress, setInProgress] = useState('');
    const [inprogressText, setInProgressText] = useState('');

    const onChangeTodo = (e) => {
      setTodo(e.target.value);
    }
    const onChangeInProgress = (e) => {
      if (e.target.progress === 'on') {
        setInProgress(0);
        setInProgressText(`This task is set to Outstanding`)
      } else {
        setInProgress(1);
        setInProgressText(`This task is set to In Progress`)
      }
      console.log(inprogress)
    }

    const onSubmit = (e) => {
      e.preventDefault();

      const updateRef = firebase.firestore().collection('todos').doc(props.match.params.id);
      updateRef.set({
        todo,
        inprogress,
      }).then((docRef) => {
        setKey('');
        setTodo('');
        setInProgress('');   
        console.log(`inprogress submit ${inprogress}`)
        props.history.push(`/`)
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
    useEffect(() => {
      const ref = firebase.firestore().collection('todos').doc(props.match.params.id);
      console.log(`inprogress beginning ${inprogress}`)
      ref.get().then((doc) => {
        if (doc.exists) {
          const entry = doc.data();
            setKey(doc.id);
            setTodo(entry.todo);
            setInProgress(entry.inprogress);
            setInProgressText(entry.inprogress)
      } else {
          console.log("No such document!");
        }
      });
    }, []);
  
      return (
        <div>
              <div className="container">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title">
                      EDIT TODO
                    </h3>
                  </div>
                  <div className="panel-body">
                  <h4><Link to={`/`} className="btn btn-primary return">Return to Todo List</Link></h4>
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <label htmlFor="todo">To Do:</label>
                        <input type="text" className="form-control" name="todo" value={todo} onChange={onChangeTodo} placeholder={todo} />                
                      </div>
                      {/* <FloatingLabel controlId="floatingSelect" label='inprogress'>
                        <Form.Select onChange={onChangeInProgress}  aria-label="Floating label select example">
                          <option value="1">In Progress</option>
                          <option value="0">Outstanding</option>
                        </Form.Select>
                      </FloatingLabel> */}
                      <Form.Group className="mb-3" id="formGridCheckbox">
                        <Form.Check onChange={onChangeInProgress} label={inprogressText} className="form-control" name="inprogress" placeholder={inprogress}/>
                      </Form.Group>  
                      <Button type="submit">Submit</Button>
                    </form>
                  </div>
                </div>
              </div>
          </div>
      );
    }
  
  export default Edit;