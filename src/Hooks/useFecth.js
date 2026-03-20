import React, { useEffect, useState } from 'react'

const useFecth = ( url ) => {
 
    const [data,setdata ]=useState([])
    const [loading,setloading]=useState(false)
    const [error,seterror]=useState(null)

    useEffect(()=>{
        let fetchData = async ()=>{
            try{
                setloading(true)
                let res = await fetch(url)
                let resData=await res.json()
                let resarry=[]
                for ( let key in resData ){
                    resarry.push({
                        id:key,
                        ...resData[key]
                    }
                )
            }
            
                // console.log(resData,'converted array    ');
                
                setdata(resarry)
            }
            catch(error){
                seterror(error.message)
            }
            finally{
                setloading(false)
            }
        }
        fetchData()
        },[url])


  return {data,loading,error}
}

export default useFecth


