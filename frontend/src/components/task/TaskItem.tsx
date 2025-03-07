import { item } from '@/utils'
import { motion } from 'motion/react'
import { IoCreate, IoStar, IoTrashBin } from 'react-icons/io5'

export const TaskItem = () => {
  
  
  
  return (
    <motion.div 
        className='h-36 px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white'
        variants={item}
    >
        <div>
            <h4 className='text-2xl font-bold text-gray-800'>New Task</h4>
            <p className='line-clamp-3'>Hellow there Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis illum dignissimos voluptatum laudantium, odio tenetur nesciunt repudiandae asperiores nam cumque optio reiciendis sapiente ipsum veritatis pariatur consequatur commodi quasi odit.</p>
        </div>

        {/* Footer card */}
        <div className='flex items-center justify-between mt-auto'>
            <p className='text-sm text-gray-400'>2 days ago</p>
            <p className='text-sm font-bold text-yellow-500'>medium</p>

            {/* Action Icons */}
            <div className='flex items-center gap-3 text-xl text-[1.2rem]'>
                <button 
                    className='text-gray-400'
                    onClick={() => console.log('become favorite button')}
                >
                    <IoStar />
                </button>
                <button 
                    className='text-blue-400'
                    onClick={() => console.log('edit button')}
                >
                    <IoCreate />
                </button>
                <button 
                    className='text-red-400'
                    onClick={() => console.log('become favorite button')}
                >
                    <IoTrashBin />
                </button>
            </div>
        </div>

    </motion.div>
  )
}