import { useState, useEffect, useCallback } from "react";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import ECharts from "../components/echarts";

import { fetchingActors, fetchedActors } from "../redux/features/actorsSlice";
import data from "../assets/data.json";
import Actor from "../components/actor-card";
import Search from "../components/search";

const Home = () => {
  // redux useful
  const actors = useSelector((state) => state.actors.actors);
  const loading = useSelector((state) => state.actors.loading);
  const dispatch = useDispatch();

  // local state
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);
  const [criteria, setCriteria] = useState(1);
  const handleChangeCriteria = (e) => setCriteria(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      // simulate request timeout
      const request = new Promise((resolve) => {
        // setLoading(true);
        dispatch(fetchingActors());
        setTimeout(() => resolve(data), 600);
      });

      request.then((result) => {
        let list = result.actors;
        let actors;
        // handle search
        if (search) {
          const regex = new RegExp(`^${search}|${search}`, "gi");
          const fullname = (first, last) => first + " " + last;
          list = list.filter((el) => {
            return regex.test(fullname(el.firstname, el.lastname));
          });
        }
        // handle sort
        if (criteria === 1) {
          const sortedActors = list.sort((a, b) => a.price - b.price);
          actors = [...sortedActors];
        } else {
          const sortedActors = list.sort((a, b) => {
            return (
              new Date(b.careerStart).getTime() -
              new Date(a.careerStart).getTime()
            );
          });
          actors = [...sortedActors];
        }

        // stock data
        dispatch(fetchedActors(actors));
        // setActors(actors);
        // setLoading(false);
        return result;
      });
    };
    fetchData();
  }, [criteria, search]);

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
    <div>
      {/* <ECharts /> */}
      <div className="h-[80px] flex justify-center items-center">
        <Search
          search={search}
          handleChangeSearch={handleChangeSearch}
          criteria={criteria}
          handleChangeCriteria={handleChangeCriteria}
        />
      </div>

      {!loading && actors ? (
        <div className="mt-8 w-full grid grid-cols-5 justify-items-center gap-y-8">
          {actors.map((el) => (
            <Actor key={el.id} data={el} formatDate={formatDate} />
          ))}
        </div>
      ) : (
        <div className="relative h-full w-full flex justify-center items-center">
          <ClipLoader size={66} />
        </div>
      )}
    </div>
  );
};

export default Home;
