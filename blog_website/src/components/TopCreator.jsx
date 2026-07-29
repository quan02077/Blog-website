import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import Blog_context from '../context/Blog_Context'
import * as action from '../context/Actions'

function TopCreators({ topCreators = [] }) {
    const [, dispatch] = useContext(Blog_context)
    return (
        <div className='bg-white dark:bg-dark-surface rounded-3xl p-4 mt-5 border border-transparent dark:border-gray-800'>
            <h3 className='font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                <FontAwesomeIcon icon={faTrophy} className="text-yellow-500" />
                Top Creators
            </h3>
            <hr className='border-gray-200 dark:border-gray-800 mt-2' />
            <div className='flex flex-col gap-2 mt-2'>
                {topCreators?.map((creator, index) => (
                    <React.Fragment key={index}>
                        <div
                            className='flex flex-col p-4 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:rounded-2xl hover:-translate-y-1.5 duration-200 hover:transition-all'
                            onClick={() => dispatch(action.toggleInfoAction(true))}
                        >
                            <div className='flex justify-between items-center mt-2 gap-3'>
                                <img className='w-10 h-10 rounded-full object-cover' src={creator.avatar} alt={creator.name} />
                                <div className='flex flex-col flex-1'>
                                    <p className='text-md font-medium text-gray-800 dark:text-gray-200 leading-tight'>{creator.name}</p>
                                    <p className='text-xs text-gray-400'>{creator.followers} followers</p>
                                </div>
                                <button
                                    onClick={(e) => e.stopPropagation()}
                                    className='text-xs text-white bg-blue-500 px-3 py-2 rounded-full hover:bg-blue-600 hover:-translate-y-1.5 duration-200 hover:transition-all cursor-pointer'
                                >
                                    Follow
                                </button>
                            </div>
                        </div>
                        {index !== topCreators.length - 1 && <hr className='border-gray-200 dark:border-gray-800' />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
export default TopCreators