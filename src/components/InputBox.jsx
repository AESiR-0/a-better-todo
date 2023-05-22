import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

function InputBox() {
  const inputTitle = useRef("");
  const inputDescription = useRef("");
  const [data, setData] = useState([]);
  const checkBox = document.getElementById('status');
  const deev = document.getElementById('strik');
  const Strike = () => {
    if (checkBox.checked == true){
      deev.style.textDecoration = 'line-through'
    } else {
      deev.style.textDecoration = 'none'
        }
  }

  return (
    <>
      <div className="input translate-y-56 flex justify-center items-center   ">
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
            setData([
              ...data,
              {
                title: inputTitle.current.value,
                description: inputDescription.current.value,
              },
            ]);
            inputTitle.current.value = '',
            inputDescription.current.value = ''
          }}
          id="add-task"
        >
          <FaPlus></FaPlus>
        </button>
      </div>
      <div className="display translate-y-80 relative left-80  border-solid w-fit flex">
        <h1>Status</h1>
        <h1>Title</h1>
        <h1>Description</h1>
        <br />
        </div>
        <div id="strike">
      {data && data.length>0 ? data.map((value, index)=>{
            return(
              <div className="w-fit translate-x-40 py-4 translate-y-96 flex" key={index}>
              <input className="mx-10 translate-x-80" type="checkbox" onChange={Strike}  name="Status" id="status" />    
              <h2  className="title mx-36 translate-x-80">{value.title}</h2>
              <h6  className="desc mx-28 translate-x-80">{value.description}</h6>
            
              
              </div>
            )
          }): "No ToDo"}
        </div>
    </>
  );
}

export default InputBox;
