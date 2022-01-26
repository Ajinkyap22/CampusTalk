import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import ForumList from "./ForumList";

function Join() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect((e) => {
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
    <div className="flex justify-center items-center w-full h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-bubble flex relative flex-col justify-start items-center h-full">
          <h1 className="text-3xl font-bold mb-2 mt-10 text-primary">
            Join Forum
          </h1>
          <h2 className="my-2 text-primary text-lg">
            Select your institute's forum to join
          </h2>
          <p className="w-1/2 mx-auto my-3 text-center text-sm ">
            You can join upto 3 forums. You will become a member of the forum
            once the moderators of the forums accept your request.
          </p>

          <section className="bg-white rounded shadow-lg w-[90%] md:w-[60%] 2xl:w-1/3 my-5 mb-20 text-center">
            <ForumList forums={forums} />

            <button className="bg-primary px-5 py-2 my-5 text-white rounded-full hover:bg-blue-700">
              Next
            </button>

            <hr />

            <p
              className="text-center w-1/2 m-auto pt-10 pb-5"
              hidden={forums ? true : false}
            >
              Looks like we couldn't find any forums for you, why don't you
              create one?
            </p>

            <div className="my-4 mb-10 w-1/3 mx-auto text-center">
              <p className="text-secondary">
                Can't find your institute in ths list? Just create your
                institute's forum!
              </p>

              <button className="px-3 py-1.5 mt-5 text-sm md:text-base 2xl:text-lg text-primary bg-white border border-primary rounded-full hover:bg-primary hover:text-white">
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
