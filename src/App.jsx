import "./App.css";
import { FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";

function App() {
  const [theme, setTheme] = useState("light");
  const ToogleTheme = () => {
    if (theme == "light") {
      console.log("working");
      setTheme("dark");
    } else {
      console.log("working else");
      setTheme("light");
    }
  };
  useEffect(() => {
    document.body.classList.remove = "light";
    document.body.className = theme;
  }, [theme]);



  return (
    <div id="body" className="light w-screen h-full mt-12">
      <nav>
        <div className="flex mx-4 ">
          <ul className="flex ">
            <h2 className="text-xl transition-all font-semibold mx-14 hover:cursor-pointer hover:scale-125 hover:text-zinc-400 ">
              Prat Form
            </h2>
            <div className="flex relative left-[700px] top-2">
              <li className="ml-20 mx-20 transition-transform translate-y-1 scale-[1.1] hover:cursor-pointer hover:translate-y-[-4px] ">
                Home
              </li>
              <li className="ml-20 mx-20 transition-transform translate-y-1 scale-[1.1] hover:cursor-pointer hover:translate-y-[-4px]">
                Contact Us
              </li>
              <li className="ml-20 mx-20 transition-transform scale-150 translate-y-1 hover:scale-[1.75] hover:cursor-pointer">
                <button onClick={ToogleTheme}>
                  <FaMoon></FaMoon>
                </button>
              </li>
            </div>
          </ul>
        </div>
      </nav>
      <InputBox></InputBox>
    </div>
  );
}

export default App;
