import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async() => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  }
  

  // When page is Loaded we check wheather Passwords are in their in LocalStorage or not, if they are then set passwordArray as what they are present.
  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    // alert("Show the Password");
    // passwordRef.current.type = "text"
    // console.log(ref.current.src)

    if (ref.current.src.includes("icons/eyecross.svg")) {
      ref.current.src = "icons/eye.svg";
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/eyecross.svg";
      passwordRef.current.type = "text"
    }
  };

  const savePassword = async() => {
    // console.log(form);

    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

      // If any such ID exsists in the DB, delete it
      await fetch("http://localhost:3000/",{method: 'DELETE', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: form.id})})

      setpasswordArray([...passwordArray,{...form, id:uuidv4()}]);
      await fetch("http://localhost:3000/",{method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...form, id:uuidv4()})})
      // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]))
      console.log([...passwordArray,form])
      setform({ site: "", username: "", password: "" })
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      toast('Error: Password not Saved'); // We can run Toast without all Options
    }
  };

  const deletePassword = async(id) => {
    console.log("Deleting password with ID",id)
    let c = confirm("Do you want to really delete this Password ?")
    if(c){
      setpasswordArray(passwordArray.filter(item => item.id!==id)); // This happens because we put an Array of DeletePassword
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!==id)))
      let res = await fetch("http://localhost:3000/",{method: 'DELETE', headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({id})})
      toast('Password Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }
    
  };

  const editPassword = (id) => {
    
    console.log("Editing password with ID ",id)
    setform({...passwordArray.filter(i => i.id===id)[0],id:id})
    setpasswordArray(passwordArray.filter(i => i.id!==id))
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text)=>{
    // alert("Copied to Clipboard "+text)
    toast('Copy to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(text)
  }

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      // transition={Bounce}
      />
      {/* <div className="absolute top-0 z-[-2] h-screen w-32screen bg-green-500 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div> */}
      {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div> */}
      {/* <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,200,0,0.13)_0,rgba(0,200,0,0)_50%,rgba(0,200,0,0)_100%)]"></div> */}
      {/* <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(200,255,200,0.5)_100%)]"></div> */}
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-green-50"></div>


      <div className=" p-3 md:px-0 mycontainer min-h-[85.3vh]">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="site" id="sitee" placeholder="Enter website URL" />
          <div className="flex flex-col md:flex-row justify-between gap-8 w-full">
            <input value={form.username} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text" placeholder="Enter Username" name="username" id="username" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="password" placeholder="Enter Password" name="password" id="password"/>
              <span className="absolute right-[1px] top-[1px]" onClick={showPassword}>
                <img ref={ref} className="p-1" width={30} src="icons/eye.svg" alt="eye"/>
              </span>
            </div>
          </div>
          <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-green-900">
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover">
          </lord-icon>
            Save
          </button>
        </div>

        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length !== 0 && 
          <table className="table-auto w-full rounded-md overflow-hidden mb-10">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-100">
                {passwordArray.map((item, index)=>{
                    
                return <tr key={index}>
                <td className="text-center border border-white py-2">
                  <div className="flex items-center justify-center">
                  <a href={item.site} target="blank">{item.site}</a>
                  <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.site)}}>
                    <lord-icon
                        src="https://cdn.lordicon.com/xuoapdes.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}>
                    </lord-icon>
                  </div>
                  </div>
                </td>
                <td className="text-center border border-white py-2 ">
                  <div className="flex items-center justify-center">
                  <span>{item.username}</span>
                  <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
                    <lord-icon
                        src="https://cdn.lordicon.com/xuoapdes.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}>
                    </lord-icon>
                  </div>
                  </div>
                </td>
                <td className="text-center border border-white py-2 ">
                  <div className="flex items-center justify-center">
                  <span>{"*".repeat(item.password.length)}</span>
                  <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>
                    <lord-icon
                        src="https://cdn.lordicon.com/xuoapdes.json"
                        trigger="hover"
                        style={{"width":"25px","height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}>
                    </lord-icon>
                  </div>
                  </div>
                </td>
                <td className="text-center border border-white py-2 justify-center">

                  <span className="cursor-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                  <lord-icon
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                      stroke="bold"
                      state="hover-line"
                      colors="primary:#121331,secondary:#000000"
                     style={{"width":"25px","height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}}>
                  </lord-icon>
                  </span>

                  <span className="cursor-pointer mx-1" onClick={()=>{deletePassword(item.id)}}>
                  <lord-icon
                    src="https://cdn.lordicon.com/xyfswyxf.json"
                    trigger="hover"
                    style={{"width":"25px","height":"25px", "paddingTop":"3px", "paddingLeft":"3px"}} >
                  </lord-icon>
                  </span>
                </td>
              </tr> })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  );
};

export default Manager;

// For making Toasts Notifications in React - https://fkhadra.github.io/react-toastify/introduction