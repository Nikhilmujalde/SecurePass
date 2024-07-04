import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setform] = useState({ site: "", userName: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])
    const handleDel = (id) => {
        // alert("deleting the pass")
        toast.warn('Password Deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
    const handleEdit = (id) => {
        setform({...passwordArray.filter(item => item.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        //  localStorage.setIt em("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        // alert("editing")
    }
    const copyText = (text) => {
        toast.info('Copied to Clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }
    const savePass = () => {
        toast.success('Password Saved', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        // alert("Save your password")
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
        setform({ site: "", userName: "", password: "" })

    }
    const showPass = () => {
        // alert("Heloo")
        // here we are using includes to check for the string   

        if (ref.current.src.includes("./SecurePass/icons/see.png")) {
            passRef.current.type = "text"
            ref.current.src = "./SecurePass/icons/visible.png"
            // console.log("lsj");
        }
        else {
            passRef.current.type = "password"
            ref.current.src = "./SecurePass/icons/see.png"
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
            />
            {/* <div className="absolute top-0 z-[-2]  rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}

            <div className="container max-w-4xl mx-auto text-black min-h-[80.7vh]">
                <h1 className="text-3xl text text-center font-bold">
                    <span className='text-green-400'>&lt;</span>
                    <span className=''>Secure</span>
                    <span className='text-green-400'>Pass/&gt;</span>
                </h1>
                <p className='text text-center text-lg text-green-600'>Your own password manager</p>
                <div className=" flex flex-col  text-white gap-3 items-center">
                    <input value={form.site} onChange={handleChange} name='site' placeholder='Enter Website name' className='border border-green-400 rounded-md text-black w-full py-1 px-4' type="text" />
                    <div className=" flex w-full justify-between gap-2">
                        <input value={form.userName} onChange={handleChange} name='userName' placeholder='Enter Username' className='border  border-green-400 rounded-md text-black py-1 w-full px-4' type="text" />
                        <div className="relative">

                            <input ref={passRef} value={form.password} onChange={handleChange} name='password' placeholder='Enter Password' className='border  border-green-400 rounded-md text-black py-1 w-full px-4' type="password" />
                            <span className='absolute right-0 top-1  cursor-pointer' onClick={showPass}>
                                <img ref={ref} width={26} className='p-1' src="./SecurePass/icons/see.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePass} className='flex justify-center items-center w-fit my-2 bg-green-400 hover:bg-green-600 rounded-lg p-2 py-1.5 border border-green-600 gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save password
                    </button>
                </div>
                <div className="passwords h-full w-full pb-10">
                    <h2 className='font-bold py-4 text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className="table-auto w-full  overflow-hidden rounded-md ">
                            <thead className='bg-green-800'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                <a  style={{ wordBreak: 'break-word' }} target='_blank'>{item.site}</a>
                                                {/* <div className='cursor-pointer'  onClick={() => copyText(item.site)}>
                                                    <img className='w-6 cursor-pointer-' src="/icons/copy.png" alt="" />
                                                </div> */}
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                {item.userName}
                                                <div className='cursor-pointer ' 
                                                    onClick={() => copyText(item.userName)}>
                                                    <img className='w-6 cursor-pointer-' src="./SecurePass/icons/copy.png" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center w-32 py-2 border border-white'>
                                            <div className='flex justify-center items-center'>
                                                {item.password}
                                                <div className='cursor-pointer' onClick={() => copyText(item.password)}>
                                                    <img className='w-6 cursor-pointer-' src="./SecurePass/icons/copy.png" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-center  w-32 py-2 border border-white'>
                                            <div className="flex justify-center items-center">
                                                {/* <span>Delete</span> */}
                                                <span onClick={() => handleDel(item.id)} className='cursor-pointer mx-2 mt-1 '>
                                                    <lord-icon className='w-5'
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                    >
                                                    </lord-icon>
                                                </span>
                                                {/* <span>Edit</span> */}
                                                <span onClick={() => handleEdit(item.id)} className='cursor-pointer mx-2'>
                                                    <img className=' w-5' src="./SecurePass/icons/edit.png" alt="" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
