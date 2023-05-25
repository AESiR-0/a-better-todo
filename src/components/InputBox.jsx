import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

function InputBox() {
  const inputTitle = useRef("");
  const inputDescription = useRef("");
  const [data, setData] = useState([]);
  if (!window.indexedDB) {
    console.log(`Your browser doesn't support IndexedDB`);
    return;
  }
  const request = indexedDB.open("ToDo", 1);
  request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };

  request.onsuccess = () => {
    // add implementation here
    console.log("Database opened successfully");
  };
  var qt;
  // create the Contacts object store and indexes
  request.onupgradeneeded = (event) => {
    var db = event.target.result;
    qt=db;
    // create the Contacts object store
    // with auto-increment id
    db.createObjectStore("ToDo", {
      autoIncrement: true,
    });
  };

  function insertValue(db=qt, value) {
    // create a new transaction
    // eslint-disable-next-line no-undef
    const txn = db.transaction("ToDo", "readwrite");

    // get the Contacts object store
    const store = txn.objectStore("ToDo");
    //
    let query = store.put(value);

    // handle success case
    query.onsuccess = function (event) {
      console.log(event);
    };

    // handle the error case
    query.onerror = function (event) {
      console.log(event.target.errorCode);
    };

    // close the database once the
    // transaction completes
    txn.oncomplete = function () {
      db.close();
    };
  }

  function getAllTodo(db=qt) {
    
    const txn = db.transaction('ToDo', "readonly");
    const objectStore = txn.objectStore('ToDo');

    objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;
        if (cursor) {
            let Todo = cursor.value;
            console.log(Todo);
            // continue next record
            cursor.continue();
        }
    };
    // close the database connection
    txn.oncomplete = function () {
        db.close();
    };
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
            getAllTodo();
          
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
