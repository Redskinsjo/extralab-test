import { useCallback } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { BsEmojiFrownFill } from "react-icons/bs";

import Actor from "../components/actor-card";

const Favorites = () => {
  const favActors = useSelector((state) => state.favActors.actors);

  // format of career start date
  // useCallback and placed in parent for performance
  const formatDate = useCallback((dateObject) => {
    const date = new Date(dateObject);
    const year = String(date.getFullYear());
    const month =
      date.getMonth() < 10 ? "0" + date.getMonth() : String(date.getMonth());
    const day = String(date.getDate());
    return year + month + day;
  }, []);

  return (
    <div className="h-full">
      {favActors.length !== 0 ? (
        <div className="mt-8 w-full grid grid-cols-5 justify-items-center gap-y-8">
          {favActors.map((el) => {
            return <Actor key={el.id} data={el} formatDate={formatDate} />;
          })}
        </div>
      ) : favActors.length === 0 ? (
        <div className="flex justify-center mt-8 items-center">
          <span className="mr-2">Sorry, nothing to render</span>
          <BsEmojiFrownFill />
        </div>
      ) : (
        <div className="relative h-full w-full flex justify-center items-center">
          <ClipLoader size={66} />
        </div>
      )}
    </div>
  );
};

export default Favorites;
