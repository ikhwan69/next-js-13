import React, { useEffect, useState } from "react";
import Thumb from "../Thumb/Thumb";
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import Like from "./Like";

const CardInfo = ({ avatar, first_name, last_name, email, url, text }) => {
    const { query: { id } } = useRouter()
    const [isSaved, setIsSaved] = useState(false);
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(() => sessionStorage.getItem("token") || null)
        if (localStorage.getItem('saveLike')) {
            const saveLike = JSON.parse(localStorage.getItem('saveLike'))
            if (saveLike.includes(id)) {
                setIsSaved(true);
            } else {
                setIsSaved(false)
            }
        } else {
            localStorage.setItem('saveLike', JSON.stringify([]));
        }
    }, [id])

    const handleSaveButtonLike = async () => {
        const saveLike = JSON.parse(localStorage.getItem('saveLike'));
        if (!isSaved) {
            saveLike.push(id);
            localStorage.setItem('saveLike', JSON.stringify(saveLike));
            toast.success('Like');
            setIsSaved(true)
        } else {
            saveLike.splice(saveLike.indexOf(id), 1);
            localStorage.setItem('saveLike', JSON.stringify(saveLike));
            toast.error('Unlike');
            setIsSaved(false);
        }
    }


    return (
        <div className="relative w-full md:mt-9 mt-3 h-auto p-4">
            <div className="relative md:h-[70vh] flex flex-col md:flex-row max-w-5xl p-8 m-auto z-10 rounded-xl bg-gray-800 ">
                <div className="relative w-full h-60 md:h-auto md:w-1/2">
                    <Thumb avatar={avatar} />
                </div>
                <div className="text-white grid items-center md:px-5 gap-6 py-3 md:w-2/3 ">
                    <div className="grid grid-row gap-2">
                        <h2 className="text-2xl md:text-4xl font-bold">
                            {first_name} {last_name}
                        </h2>
                        <h3 className="text-lg font-bold">Description:</h3>
                        <p className=" text-sm md:text-md">{text}</p>
                        <h3 className="text-lg  font-bold">Url</h3>
                        <p className="text-sm md:text-md">{url}</p>
                        <h3 className="text-lg  font-bold">Email</h3>
                        <p className="text-sm md:text-md">{email}</p>

                    </div>
                    <div className="flex justify-center gap-3">
                        {token ? (
                            <Like isSaved={isSaved} handleSaveButtonLike={handleSaveButtonLike} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardInfo;
