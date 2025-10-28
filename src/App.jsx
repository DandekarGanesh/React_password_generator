import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = ""
    let str = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"

    if(num) str += "0123456789"
    if(char) str += "!@#$%^&*()_+{?|<>:;>/"

    for(let i=0; i<length; i++) {
      let idx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(idx);
    }

    setPassword(pass);

  }, [length, num, char, setPassword]);


  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,21)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGen()
  }, [num, char, passwordGen])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-2xl rounded-xl px-6 py-5 my-10 text-orange-400 bg-gray-800 backdrop-blur-md'>
        <h1 className='text-white text-center text-2xl font-semibold mb-6 tracking-wide'>
          Password Generator
        </h1> 

        <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
          <input 
            type="text" 
            value={password} 
            ref={passRef} 
            className='outline-none w-full py-2 px-3 bg-gray-100 text-gray-900 font-medium text-center placeholder-gray-400 select-none' 
            placeholder='password' 
            readOnly
          />
          <button 
            onClick={copyPasswordToClipboard} 
            className='bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white px-4 font-semibold'>
            Copy
          </button>
        </div>

        <div className='flex flex-col gap-4 text-sm'>
          <div className='flex items-center justify-between'>
            <label className='text-gray-200 font-medium'>Length : {length}</label>
            <input 
              type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer accent-orange-500 w-40' 
              onChange={(e) => setLength(e.target.value)} 
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor="numberInput" className='text-gray-200 font-medium'>Include Numbers</label>
            <input 
              type="checkbox" 
              defaultChecked={num} 
              id="numberInput" 
              className='w-5 h-5 accent-blue-500 cursor-pointer' 
              onChange={() => setNum((prev) => !prev)} 
            />
          </div>

          <div className='flex items-center justify-between'>
            <label htmlFor="characterInput" className='text-gray-200 font-medium'>Include Characters</label>
            <input 
              type="checkbox" 
              defaultChecked={char} 
              id="characterInput" 
              className='w-5 h-5 accent-blue-500 cursor-pointer' 
              onChange={() => setChar((prev) => !prev)} 
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
