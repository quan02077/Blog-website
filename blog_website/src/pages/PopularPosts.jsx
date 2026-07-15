import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"



function PopularPosts() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold mb-4"><FontAwesomeIcon icon={faArrowUp} />Popular Posts</h2>
            <div className='felx-col'>
            </div>
        </div>
    )
}
export default PopularPosts
