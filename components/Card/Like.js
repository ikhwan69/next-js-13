
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const Like = ({  isSaved, handleSaveButtonLike }) => {
    return (
        <>
            {isSaved ? (
                <button
                    onClick={handleSaveButtonLike}
                    className="flex gap-1 items-center border-blue-600 border-2 bg-blue-600 text-gray-200 md:px-5 md:py-1 px-3 py-1 md:text-xl text-sm rounded-md"
                >
                    <AiFillHeart className="w-8 h-8 " /> <span>Like 1</span>
                </button>
            ) : (
                <button
                    onClick={handleSaveButtonLike}
                    className="flex gap-1 items-center border-gray-200 border-2 text-gray-200 md:px-5 md:py-1 px-3 py-1 md:text-xl text-sm rounded-md"
                >
                    <AiOutlineHeart className="w-8 h-8 " /> <span>Like 0</span>
                </button>
            )}
        </>
    )
}

export default Like