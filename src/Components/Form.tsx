import React,{FC,useRef} from 'react'
import { ITodo } from '../type/type'

interface IForm {
    edit:ITodo|null|undefined;
    input:string;
    createTodo:()=>void;
    handleInput:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    pressEnter:(e:React.KeyboardEvent<HTMLInputElement>)=>void
}

const Form:FC<IForm> = ({input,handleInput,createTodo,pressEnter,edit}) => {

    const ref = useRef<HTMLInputElement>(null)
    
    if(edit){
        ref.current?.focus()
    }

    return (
        <div className='container_form'>
            <input  className='container_form_input'  onKeyUp={pressEnter} onChange={(e)=>handleInput(e)} type="text" value={input} placeholder='write todo...'/>
            <button className='container_form_button'  onClick={createTodo}>{edit ?'Edit' :'Add'}</button>
        </div>
    )
}

export default Form
