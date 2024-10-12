import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [charAllowed, setCharAllowed] = useState(false);
  const [alphaAllowed, setAlphaAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);

  const passwordGenerator= useCallback(()=>{
    let pass = "";
    let str= "";
    if (alphaAllowed) str+= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*";
    for(let i=0; i<length; i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length));
      }
      setPassword(pass);
  },[length,charAllowed,numberAllowed, alphaAllowed, setPassword]);

  const passwordRef= useRef(null);

  const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed, alphaAllowed, passwordGenerator]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <div className="w-1/2 h-1/2 rounded-xl bg-slate-500 text-white px-1 flex-col justify-center items-center border-slate-600 border-8">
        <h1 className="text-5xl font-semibold m-8 text-orange-400 text-center flex items-center justify-center">
          Password Generator
        </h1>
        <div className="flex shadow outline-none overflow-hidden mb-4 text-orange-400 rounded-lg">
          <input
            type="text"
            className="p-2.5 outline-none w-full"
            readOnly
            placeholder="Password"
            value={password}
            ref={passwordRef}
          />
          <button className="text-2xl text-white font-semibold outline-none bg-blue-500 p-1 shrink-0" 
            onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full justify-center items-center  ">
          <div className="flex justify-center items-center">
            <input
              type="range"
              min={1}
              max={30}
              value={length}
              className=" ml-4 cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className=" text-lg">Length:{length}</label>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              id="characterAllow"
              defaultValue={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterAllow">Character</label>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              id="alphaAllow"
              defaultValue={alphaAllowed}
              onChange={() => {
                setAlphaAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="alphaAllow">Alphabets</label>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="checkbox"
              defaultValue={numberAllowed}
              id="numberAllow"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberAllow">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
