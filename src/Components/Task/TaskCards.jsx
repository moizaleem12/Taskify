import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { firestore } from "../../services/firebase";
import { doc,getDoc } from "firebase/firestore";

export default function TaskCards(props) {
  const { deletetasks, toggleFavorite, user } = useFirebase();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user) {
        const favoriteRef = doc(
          firestore,
          "favorites",
          `${user.uid}_${props.id}`
        );
        const favoriteSnap = await getDoc(favoriteRef);
        setIsFavorite(favoriteSnap.exists());
      }
    };

    checkIfFavorite();
  }, [user, props.id]);

  const handleFavoriteClick = () => {
    toggleFavorite(props.id, isFavorite);
    setIsFavorite(!isFavorite);
  };

  const handleRemoveFromFavorites = () => {
    toggleFavorite(props.id, true); 
    setIsFavorite(false); // Update local state
    setShowMenu(false); // Close the menu
    if (props.onRemoveFavorite) {
      props.onRemoveFavorite(); 
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "work":
        return "bg-green-500";
      case "personal":
        return "bg-yellow-500";
      case "idea":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <>
      <div
           className={`relative ${
            props.layout === "grid" ? "col-span-1" : "w-full "
          } p-5 max-h-min bg-white shadow-md rounded-lg overflow-hidden flex flex-col sm:p-4 md:p-6 lg:p-8`}
        >
          <h5 className="font-medium lg:text-base break-words sm:text-sm md:text-base">
            {props.taskname}
          </h5>
          <p className=" mt-2 max-w-full  lg:text-sm sm:text-xs md:text-sm">
            {props.tasknotes}
          </p>
          <div className="flex flex-col items-center">
            <span
            
              className={`absolute top-4 right-10 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${getStatusColor(
                props.taskstatus
              )}`}
            >
              {props.taskstatus}
            </span>
            {!props.isFavorite && (
              <span
                className="absolute top-4 right-0 cursor-pointer text-xs me-2 px-2.5 py-0.5 rounded-full"
                onClick={handleFavoriteClick}
              >
                {isFavorite ? <IoIosHeart color="red" /> : <IoIosHeartEmpty />}
              </span>
            )}
            {props.isFavorite && (
              <div className="absolute top-4 right-0">
                <IoEllipsisVertical
                  className="cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="absolute right-0 bg-white px-3 py-2 rounded-md shadow-lg">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={handleRemoveFromFavorites}
                        className="block text-xs text-gray-700 p-2 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Unfavorite
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => deletetasks(props.id)}
            className="mt-8 bg-red-500
             text-white : px-3 py-1 rounded-full 
             text-xs font-semibold hover:bg-red-600 sm:mt-4 md:mt-6 lg:w-max"
          >
            Delete
          </button>
        </div>
    </>
  );
}