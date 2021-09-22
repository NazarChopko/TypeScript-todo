import React,{FC,useState,useEffect} from 'react';
import Form from './Components/Form'
import TodoItem from './Components/TodoItem';
import { ITodo } from './type/type';
import {v4 as uuidv4} from 'uuid'
import './libs/App.scss'


const App:FC = () => {
  const [input,setInput]  = useState<string>('');
  const [todos,setTodos] = useState<ITodo[]>([])
  const [edit,setEdit] = useState<ITodo | null>()


  useEffect(()=> {
    if(edit){
      setInput(edit.title)
   }else{
      setInput('')
  }
  }
  ,[edit])

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value)
  }

  const newTodo = () => {
    if(!edit){
      setTodos([...todos,{'title':input,id:uuidv4(),completed:false}])
      setInput('')

        if(input === ''){
          setTodos([...todos])
        }
    }else{
      updateTodo(input,edit.id,edit.completed)
      setEdit(null)
    }
    
  }

  const pressEnter = (e:React.KeyboardEvent)=>{
    if(e.code === "Enter"){
        newTodo()
    }
   }

   const deleteTodo = (id:string)=> {
      setTodos(todos.filter(el=> el.id !== id))
   }

   const isCompletedTodo = (id:string) => {
     setTodos(todos.map(todo=> {
       if(todo.id === id){
         todo.completed = !todo.completed;
       }
     return todo })
            )
   }
  
   const editTodo = (id:string) => {
     setEdit(todos.find(todo => todo.id === id))
   }

   const updateTodo = (title:string,id:string,complete:boolean)=>{
    const newTodo:any = todos.map(todo=>
      todo.id === id ?{title,id,complete} :todo)
      setTodos(newTodo);
      setEdit(null)
   }

   console.log(edit)
  return (
    <>
    <h1>ToDo...</h1>
    <div className="App">
      <Form input={input} edit={edit} handleInput={handleInput} pressEnter={pressEnter} createTodo={newTodo} />
      <div className='todos_container'>
        {todos.map((el,i)=><TodoItem items={el} editTodo={editTodo} isCompletedTodo={isCompletedTodo} deleteTodo={deleteTodo} key={i}/>)}
      </div>
     
    </div>
    </>
  );
}

export default App;
