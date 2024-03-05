import { useState, createContext, useEffect} from "react"; 
// import {v1 as uuid} from "uuid"
const model = require("../../model/tasks.js")


export const ListContext = createContext(); 

const ListContextProvider = (props) => {
    const [items, setItems] = useState(dispalyData()); 

    function dispalyData() {

    // const localData = localStorage.getItem("items"); 
    // return localData ? JSON.parse(localData): []
}
    

    useEffect(()=>{
        model.setItem("items", JSON.stringify(items))
    },[items])

   


    const addTodo = (title) => {
        setItems([...items, {title, complete: false, editing: false, importanceLevel: "please select", id: uuid() }])

    }
    const removeTodo = (id) => {
        setItems(items.filter((item) => item.id !== id ))
    }; 


    const completeToggle = (id) =>{
        setItems(items.map(item => item.id === id?  { ...item, complete: !item.complete } : item))
    };

    const editEnabler = (id, newTitle) => {
        setItems(items.map(item => item.id === id? {...item, title: newTitle } : item))
    }

    const editDoneToggle = (id) => {
        setItems(items.map(item => item.id === id? { ...item, editing: !item.editing } : item))
    }

    const importance = (id, newImportanceLevel) => {
        setItems (items.map(item => item.id === id? {...item, importanceLevel: newImportanceLevel } : item ))
    }

    



    return (
        <ListContext.Provider value={{items, addTodo, removeTodo, completeToggle,editEnabler, editDoneToggle, importance}}>
            { props.children }
        </ListContext.Provider> 

    )




}

export default ListContextProvider
