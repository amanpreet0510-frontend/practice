import { cardProps } from '@/types/card.types';
import Image from 'next/image';
import React from 'react';


const Card = ({mainTitle,title,value,image}:cardProps) => {
  return (
<>
<div className='bg-blue-300 rounded-2xl w-100 max-h-max p-15   text-center items-center flex flex-col justify-center  text-2xl font-extrabold'>
<h2>{mainTitle}</h2>    
<Image alt='user' height={40} width={100} src={image}/>
<h1>{title}</h1>
<p>{value}</p>
</div>
</>
  )
}

export default Card;