import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useMutation} from 'react-query';
import { signUp } from '../../util/validations';

export default function SignUp() 
{
  const[userParams,setUserParams]=useState({
    userName:undefined,
    email:undefined,
    password:undefined,
    passwordRetry:undefined,
  })
  const[errorList,setErrorList]=useState(undefined)
  const{mutate,data:backendResponse}=useMutation(submitForm)

  useEffect(()=>
  {
    const{value,error}=signUp.validate(userParams,{abortEarly:false});

    if(error)
    {
      const errors={}
      
      if(value.userName&&(value.userName?.match(/[a-z]/gi)||[]).length<3)
      {
        errors.userName='Username must be have 3 characters A-Z at least'
      }

      error.details.forEach(entry=>
        {
          if(entry.context.key==='userName')
          {
            errors.userName=entry.message
          }
          if(entry.context.key==='email')
          {
            errors.email=entry.message
          }
          if(entry.context.key==='password')
          {
            errors.password=entry.message
          }
          if(entry.context.key==='passwordRetry')
          {
            errors.passwordRetry=entry.message
          }
        })
        

      setErrorList(errors)
      return
    }

    setErrorList('ok')
  },[userParams])

  useEffect(()=>
  {
    setErrorList(undefined)
  },[])
  
  async function submitForm(e)
  {
    e.preventDefault();
    const req= await axios.post('http://localhost:3001/sign_up',userParams)
    console.log(req.data)
    return req.data
  }

    return (
      <main className='container'>
        {
          backendResponse!=='ok'&&(backendResponse?.length>0)&&<ErrorMsg backendResponse={backendResponse} />
        }
        <SignUpForm setUserParams={setUserParams} mutate={mutate} errorList={errorList} />  
      </main>
    )
}

function SignUpForm(props)
{
  const
  {
    setUserParams,
    mutate,
    errorList
  }=props

    return(
      <div className='flex w-[100%] justify-center'>
        <form method='POST' onSubmit={mutate} className="flex flex-col w-[473px] max-w-[100%] gap-[1rem]" >
          <h1 className='title-form'>
             Registration
          </h1>
          <Input 
            name={'user-name'}
            max={16}
            min={5}
            type={'text'}
            placeholder={'Username'}
            underText={'Maximum of 16 characters'}
            errorMsg={errorList?.userName}
            func={(e)=>setUserParams(prev=>{return {...prev,userName:e.target.value}})}
           />
           <Input 
            name={'email'}
            type={'text'}
            placeholder={'Email address'}
            errorMsg={errorList?.email}
            func={(e)=>setUserParams(prev=>{return {...prev,email:e.target.value}})}
           />
           <Input 
            name={'password'}
            type={'text'}
            placeholder={'Password'}
            min={6}
            max={50}
            underText={'Minimum of 6 characters'}
            errorMsg={errorList?.password}
            func={(e)=>setUserParams(prev=>{return {...prev,password:e.target.value}})}
           />
           <Input 
            name={'password-retry'}
            type={'text'}
            placeholder={'Password confirmation'}
            min={6}
            max={50}
            errorMsg={errorList?.passwordRetry}
            func={(e)=>setUserParams(prev=>{return {...prev,passwordRetry:e.target.value}})}
           />
            <button className='button pointer-events-none opacity-[.5]' type='submit'
             style={errorList==='ok'?{
              pointerEvents:'auto',
              opacity:1
            }:{}}
            >register</button>
        </form>
      </div>
    )
}

function Input(props)
{
  const{
    name,
    max=null,
    min=null,
    func,
    type,
    placeholder,
    className='',
    underText='',
    errorMsg
  }=props
  
  return (
    <div className='block'>
      <input
        className={`bg-secondary border-[1px] border-secondary text-white focus:border-[1px] focus:inset-0 outline-none focus:border-focus transition-all duration-[220] px-[.4rem] py-[.2rem] rounded-[.3rem] w-[100%] ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        min={min}
        maxLength={max}
        onChange={func}
      />
      {
        !errorMsg&&
        <label htmlFor="" className='text-[#8f9ca7] text-[.8rem]'>
          {underText}
        </label>
      }
      {
        errorMsg&&
        <label htmlFor="" className='p-[.2rem] block rounded-[.3rem] mt-[.5rem] text-[.9rem] text-white bg-red-500'>
          {errorMsg}
        </label>
      }
    </div>
  );
}

function ErrorMsg({backendResponse})
{
  return(
    <div className='bg-errorBg text-errorText px-[2rem] py-[.5rem]'>
       <strong>
          Looks like something went wrong...
       </strong>
       <ul>
        {
           backendResponse.map((error,pos)=>
            {
              return(
                <li key={pos}>
                   {error.message}
                </li>
              )
            })
        }
       </ul>
    </div>
  )
}