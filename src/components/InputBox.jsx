import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

function InputBox() {
  const title = useRef("");
  const description = useRef("");
  const [data, setData] = useState([]);
  const CheckBoxStatus = ()=>{}
  return (
    <>
    <div className="input translate-y-56 flex justify-center items-center   ">
      <input
        type="text"
        className="bg-black mx-2 px-2"
        ref={title}
        placeholder="Add A title"
      />
      <input
        type="text"
        className="bg-black mx-2 px-2"
        ref={description}
        placeholder="Add A Description"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setData(
            ...data,
            { title: title.current.value ,
             description: description.current.value }
          );
          title.current.value='';
          description.current.value='';
        }}
        id="add-task"
      >
        
        <FaPlus></FaPlus>
      </button>
    </div>
    <div className="display">
    {data && data.length>0 ? data.map((value, index)=>{
            return(
              <div key={index}>
                <table>
                    <thead>
                        <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                <input type="checkbox" name="Status" onChange={CheckBoxStatus} id="" />
                </th>
                
                </tr>
                </tbody></table>
              </div>
            )
          }): "No TodO"}
    </div>
    </>
  );
}

export default InputBox;
