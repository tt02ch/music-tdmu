"use client"

import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { ISongItem } from "@/app/interfaces/ISongItem";
import { onAuthStateChanged } from "firebase/auth";
import { ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";

export default function ButtonHeart(props: ISongItem) {
  const [isActive, setIsActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    id = "",
    image = "",
    title = "",
    singer = "",
    listen = 0,
    audio = "",
    className = "",
    wishlist = {}
  } = props;

  useEffect(() => {
    onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        const userId = user.uid;
        if(wishlist[userId]) {
          setIsActive(true);
        }
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddWishlist = () => {
    const userId = authFirebase?.currentUser?.uid;

    if (!userId) {
      setShowPopup(true);
      return;
    }

    if(id && userId) {
      const songRef = ref(dbFirebase, `/songs/${id}`);
      runTransaction(songRef, (song) => {
        if (song) {
          if (song.wishlist && song.wishlist[userId]) {
            song.wishlist[userId] = null;
            setIsActive(false);
          } else {
            if (!song.wishlist) {
              song.wishlist = {};
            }
            song.wishlist[userId] = true;
            setIsActive(true);
          }
        }
        return song;
      });
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  }

  return (
    <>
      <button 
        className={
          "w-[34px] h-[34px] text-white border rounded-full inline-flex items-center justify-center text-[15px] ml-[10px] " +
          (isActive ? "border-primary bg-primary" : "border-white")
        }
        onClick={handleAddWishlist}
      >
        <FaHeart />
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out scale-105">
            <p className="text-lg text-center mb-4">Bạn chưa đăng nhập. Vui lòng đăng nhập để thêm vào danh sách yêu thích.</p>
            <button onClick={handleClosePopup} className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors duration-300">
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  )
}
