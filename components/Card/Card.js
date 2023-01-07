import React from 'react'
import Thumb from '../Thumb/Thumb'

const Card = ({avatar, first_name}) => {
  return (
    <div className='h-60'>
        <div className="relative h-full">
            <Thumb avatar={avatar} size='(max-width: 768px) 100vw,
            (max-width: 1200px) 20vw' />
            <div className='absolute bottom-0 w-full py-2 px-7 rounded-b-xl bg-gray-800'>
                <h2 className='text-sm text-center truncate text-gray-200'>{first_name}</h2>
            </div>
           
        </div>
        
    </div>
  )
}

export default Card