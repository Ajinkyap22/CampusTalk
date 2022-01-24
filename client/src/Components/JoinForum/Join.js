import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import ForumList from "./ForumList";

function Join() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  // send join request on join click
  // check for join limit

  useEffect(() => {
    axios
      .get("/api/forums/")
      .then((res) => {
        setForums(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-bubble flex relative flex-col justify-start items-center">
          <h1 className="text-4xl font-bold my-2 mt-10 text-primary">
            Join Forum
          </h1>
          <h2 className="my-2 text-primary text-xl">
            Select your institute's forum to join
          </h2>

          <section className="bg-white rounded shadow-lg w-[90%] md:w-[60%] 2xl:w-1/3 my-10 mb-20">
            <ForumList forums={forums} />

            <p
              className="text-center w-1/2 m-auto pt-10 pb-5"
              hidden={forums ? true : false}
            >
              Looks like we couldn't find any forums for you, why don't you
              create one?
            </p>

            <div className="my-4 mb-10 w-1/3 mx-auto text-center">
              <p className="text-primary font-bold">
                Can't find your institute in ths list? Just create your
                institute's forum!
              </p>

              <button className="px-5 py-2 mt-5 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded-full hover:bg-blue-700">
                Create Forum
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Join;
