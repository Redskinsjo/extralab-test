import moment from "moment";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import { addFavActor } from "../redux/features/favActorsSlice";

const ActorAvatar = ({ data: el, formatDate }) => {
  const loading = useSelector((state) => state.favActors.loading);
  const dispatch = useDispatch();

  return (
    <div key={el.id} className="group" data-test="card">
      <div className="h-[400px] w-[300px] shadow-lg text-center bg-transparent transition-transform duration-700 perspective-1000 group-hover:rotate-y-180">
        <div className="relative w-full h-full flex justify-center tranform-style-preserve3d backface-hidden">
          <div className="absolute h-full w-full backface-hidden group-hover:rotate-y-180 p-8 w-[284px] box-border">
            <img
              alt={el.firstname + el.lastname}
              className="backface-hidden rounded-full inline"
              src={el.avatar}
              width={200}
              height={200}
            />
            <div className="px-2 mt-8 flex flex-col justify-around items-center">
              <p className="text-xs" data-test="start">
                Started{" "}
                <span className="font-bold">
                  {moment(formatDate(el.careerStart), "YYYYMMDD").fromNow()}
                </span>
              </p>
              <p className="h-2" />
              <p className="text-xs" data-test="price">
                Price: <span className="font-bold">$ {el.price}</span>
              </p>
            </div>
          </div>
          <div
            data-test="card-back"
            className="absolute h-full w-full rotate-y-180 invisible group-hover:visible py-8 my-[-30px] flex flex-col justify-end w-[284px] box-border"
          >
            <h1 className="font-bold text-xl mt-8">
              {el.firstname + " " + el.lastname}
            </h1>
            <p className="mt-6 text-xs px-10" data-test="from">
              From:
              <span className="flex flex-col">
                <span className="ml-2 font-bold">{el.address.street}.</span>
                <span>
                  <span className="ml-2 font-bold">{el.address.city},</span>
                  <span className="ml-2 font-bold">{el.address.zip}</span>
                </span>
                <span className="ml-2 font-bold">{el.address.country}.</span>
              </span>
            </p>
            <p className="mt-6 text-xs px-10 text-justify">{el.description}</p>
            <p className="text-xs mt-6" data-test="phone">
              Phone: <span className="font-bold">{el.phone}</span>
            </p>
            <p className="text-xs mt-2 flex-1" data-test="email">
              Email: <span className="font-bold">{el.email}</span>
            </p>
            <div className="flex w-full my-2">
              <Button
                className="w-24 flex justify-center items-center"
                endIcon={<IoIosInformationCircleOutline />}
                onClick={() =>
                  window.open(
                    `https://google.com/search?q=${el.firstname} ${el.lastname}`,
                    "_blank"
                  )
                }
                inputProps={{
                  "data-test": "more-button",
                }}
              >
                More
              </Button>
              {loading ? (
                <Button
                  className="flex justify-center items-center"
                  endIcon={<ClipLoader />}
                  onClick={() => {
                    dispatch(addFavActor(el));
                  }}
                  inputProps={{
                    "data-test": "add-button",
                  }}
                >
                  Add to Favorite
                </Button>
              ) : (
                <Button
                  className="flex justify-center items-center"
                  endIcon={<MdFavorite />}
                  onClick={() => {
                    dispatch(addFavActor(el));
                  }}
                >
                  Add to Favorite
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorAvatar;
