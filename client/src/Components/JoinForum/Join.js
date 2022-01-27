import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loading from "../Loading";
import ForumList from "./ForumList";
import { UserContext } from "../../UserContext";
import { withRouter } from "react-router-dom";

const JoinContext = React.createContext();

function JoinForum(props) {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinList, setJoinList] = useState([]);
  const [user] = useContext(UserContext);

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

  const handleNext = () => {
    // redirect to the next page
    props.history.push("/");
    // send all the join requests
    sendRequests();
  };

  const sendRequests = () => {
    if (!joinList.length) return;

    // send join requests to each selected forum after confirming rather than sending on selection & then cancelling
    joinList.forEach((forumId) => {
      let headers = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };

      let body = {
        id: user._id,
      };

      axios
        .post(`/api/forums/${forumId}/join`, body, headers)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          console.error(err);
        });
    });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-bubble flex relative flex-col justify-start items-center h-full">
          <h1 className="text-3xl font-bold mb-2 mt-10 2xl:mt-20 2xl:text-5xl 2xl:my-4 text-primary">
            Join Forum
          </h1>
          <h2 className="my-2 text-primary text-lg 2xl:my-4 2xl:text-3xl">
            Select your institute's forum to join
          </h2>
          <p className="w-1/3 mx-auto my-3 text-center text-sm 2xl:my-6 2xl:text-xl">
            You can join upto 3 forums. You will become a member of the forum
            once the moderators of the forums accept your request.
          </p>

          <section className="bg-white rounded shadow-lg w-[90%] md:w-[60%] 2xl:w-1/2 my-5 mb-20 text-center 2xl:my-8">
            <JoinContext.Provider value={[joinList, setJoinList]}>
              <ForumList forums={forums} />
            </JoinContext.Provider>

            <button
              onClick={handleNext}
              className="bg-primary px-5 py-2 my-5 text-white rounded-full hover:bg-blue-700"
            >
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

const Join = withRouter(JoinForum);

export { Join, JoinContext };
