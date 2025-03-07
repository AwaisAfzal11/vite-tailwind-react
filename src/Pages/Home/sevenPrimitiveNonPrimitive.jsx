import React, { useEffect } from 'react'
import {useState} from 'react'

function PrimitiveNonPrimitive(){
    const [price, setPrice] = useState({
        number: 50,
        total: false,
    })
    console.log('rendering')

    const handleClick = () => {
        setPrice ({
            number: 100,
            total: true,
        })
    };

    useEffect(() => {
        console.log('useEffect')},[price.number]);


    return(
       <button onClick = {handleClick}>Click Me</button> 
    )
}

export default PrimitiveNonPrimitive


{/* const a = 10
            const b = 10 
            a === b // true

            const a = {
                key:1
            }

            const b = {
                key: 1
            }

            a === b // false (pointer address is diffrent) */}