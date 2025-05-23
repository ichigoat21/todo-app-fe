import { useEffect, useRef, useState } from "react";
import { InputBox } from "../components/input";
import { Button } from "../components/button";
import { List } from "../components/List";
import axios from "axios";
import { BACKENR_URL } from "../config";

export const Dashboard = () => {

    const [todo, setTodo] = useState([]);
    const [value, setValue] = useState("")
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState();


   
    useEffect(()=> {
    async function fetchTodos(){
      try {
        const response = await axios.get(`${BACKENR_URL}/todos/todos`, {
          headers : {
            Authorization : localStorage.getItem("token")
          }
        })
        setUsername(response.data.username)
        if (Array.isArray(response.data.todo)) {
          setTodo(response.data.todo);
        }
      } catch(e) {
            console.log("failed to fetch err :", e)
      }

    } fetchTodos()
    
  } , [])
    
   async function addOrUpdateTodo (){
      if (value.trim()=== "") {
        return;
      }
      if (editIndex !== null) {
        const updatedTodo = [...todo];
        const todoId = updatedTodo[editIndex]._id;
      
        updatedTodo[editIndex] = {
          ...updatedTodo[editIndex],
          title: value
        };
        setTodo(updatedTodo);
        setEditIndex(null);
      
        await axios.put(
          `${BACKENR_URL}/todos/todos/${todoId}`,
          { title: value },
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        );
      }  else {
        const title = value
        const response = await axios.post((`${BACKENR_URL}/todos/add`), 
          { title }, 
          {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          }
        ) 
        if (response.data.todo){
          setTodo([...todo, response.data.todo])
        }
      }
      setValue("")
    }

    async function deleted(num: number, arrayInd: number) {  
      setTodo(todo.filter((_, id) => id !== arrayInd))
      try {
        await axios.delete(`${BACKENR_URL}/todos/todos/${num}`, {  
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
      } catch(e) {
        console.log("Delete failed:", e)
      }
    }
 
    function updated(num: number, arrayInd: number) {
      setValue(todo[arrayInd].title);
      setEditIndex(arrayInd);
      inputRef.current.focus();
    }
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center px-4 py-8 lg:py-12">
        
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12 w-full max-w-4xl">
          <div className="relative mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome back, {username} 👋
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Stay organized and productive with your personal task manager
          </p>
        </div>
    
        {/* Input Section */}
        <div className="w-full max-w-4xl mb-8 lg:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="flex-1">
                <InputBox
                  value={value}
                  onchange={(e) => setValue(e.target.value)}
                  reference={inputRef}
                  placeholder="What needs to be done today?"
                  className="w-full h-14 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 placeholder-gray-400"
                />
              </div>
              <div className="sm:w-48">
                <Button
                  onclick={addOrUpdateTodo}
                  text={editIndex !== null ? "✓ Update Task" : "+ Add Task"}
                  className="w-full h-14 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                />
              </div>
            </div>
          </div>
        </div>
    
        {/* Todo List */}
        <div className="w-full max-w-4xl">
          {todo.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Add your first task to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 lg:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {todo.map((item, index) => (
                <div
                  key={item._id || `temp-${index}`}
                  className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/30 p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  {/* Task Content */}
                  <div className="mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <List 
                          title={item.title}
                          className="text-gray-800 font-medium leading-relaxed break-words"
                        />
                      </div>
                    </div>
                  </div>
    
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => updated(item._id, index)}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span className="text-sm">✏️</span>
                      Edit
                    </button>
                    
                    <button
                      onClick={() => deleted(item._id, index)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span className="text-sm">🗑️</span>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    
        {/* Stats Section */}
        {todo.length > 0 && (
          <div className="w-full max-w-4xl mt-8 lg:mt-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Task Summary</h3>
                  <p className="text-gray-600">Keep up the great work!</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {todo.length}
                    </div>
                    <div className="text-sm text-gray-500">Total Tasks</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {editIndex !== null ? 'Editing' : 'Ready'}
                    </div>
                    <div className="text-sm text-gray-500">Status</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
    
    
  
   
}