import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
function Discussions({ hotDiscussions }) {
    return (
        <div className='bg-white dark:bg-dark-surface rounded-3xl p-4 mt-5 border border-transparent dark:border-gray-800'>
            <h3 className='font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
                <FontAwesomeIcon icon={faComments} className="text-blue-500" />
                Hot Discussions
            </h3>
            <hr className='border-gray-200 dark:border-gray-800 mt-2' />
            <div className='flex flex-col gap-2 mt-2'>
                {hotDiscussions.map((discussion, index) => (
                    <React.Fragment key={index}>
                        <div className='flex flex-col p-4 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:rounded-2xl hover:-translate-y-1.5 duration-200 hover:transition-all'>
                            <h4 className='font-bold text-gray-900 dark:text-gray-200'>{discussion.title}</h4>
                            <div className='flex justify-between items-center mt-2'>
                                <p className='text-xs text-gray-400'><span>by </span>{discussion.author}</p>
                                <p className='text-xs text-gray-400'><FontAwesomeIcon icon={faComments} className='mr-1' />{discussion.comments} comments</p>
                            </div>
                        </div>
                        {index !== hotDiscussions.length - 1 && <hr className='border-gray-200 dark:border-gray-800' />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
export default Discussions