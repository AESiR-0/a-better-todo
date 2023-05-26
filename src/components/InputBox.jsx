import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Localbase from 'localbase'



function InputBox() {
  const inputTitle = useRef("");
  const inputDescription = useRef("");
  const [data, setData] = useState([]);
  let db = new Localbase('ToDo')  

  function insertValue(value) {
    db.collection('todos').add(value)
  
}

const getTodos = () => {
  db.collection('todos').get().then(todos => {
    setData(todos)
  })
}

  return (
    <>
      <div className="input focus:border-1 focus:border-gray-700 translate-y-56 flex justify-center items-center   ">
        <input
          type="text"
          className="bg-black mx-2 px-2"
          ref={inputTitle}
          placeholder="Add A title"
        />
        <input
          type="text"
          className="bg-black mx-2 px-2"
          ref={inputDescription}
          placeholder="Add A Description"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            let tempData = {title: inputTitle.current.value, description: inputDescription.current.value};
            setData([
              ...data,
              {
                title: inputTitle.current.value,
                description: inputDescription.current.value,
              },
            ]);
            inputTitle.current.value = '',
            inputDescription.current.value = ''
            insertValue(tempData);
            
          
          }}
          id="add-task"
        >
          <FaPlus></FaPlus>
        </button>
      </div>
      <div className="display  top-80 relative left-[340px] w-fit  border-solid flex">
        <h1>Status</h1>
        <h1>Title</h1>
        <h1>Description</h1>
        <br />
        </div>
        
        <div id="strike">
          {getTodos()}
      {data && data.length>0 ? data.map((value, index)=>{
            return(
              <div className="w-fit list  translate-x-40 py-4 translate-y-[340px] flex " key={index}>
              <input className="mx-10 translate-x-80 done" type="checkbox"   name="Status" id="status" />    
              <h2  className="title mx-36 translate-x-80">{value.title}</h2>
              <h2  className="desc mx-28 translate-x-80">{value.description}</h2>
            
              
              </div>
            )
          }): "No ToDo"}
        </div>
    </>
  );
}

export default InputBox;
