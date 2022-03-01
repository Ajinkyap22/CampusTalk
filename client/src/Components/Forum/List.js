import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import Row from "./Row";
import LogoCropped from "../LogoCropped";

function List({ forums, forumsTab }) {
  const [user] = useContext(UserContext);

  return (
    <div>
      {forumsTab === "userForums" && (!user || user?.forums.length === 0) ? (
        <div className="text-center py-4">
          <LogoCropped color="rgba(98, 98, 98, 0.9)" width="100" />
          <p className="text-center my-3 text-gray-700">
            You have not joined any forums yet.
          </p>
        </div>
      ) : (
        <table
          className="table-fixed w-[60%] m-auto bg-white shadow-base mt-8"
          hidden={forums.length === 0}
        >
          <thead>
            <tr>
              <th className="text-primary font-normal text-xs lg:text-sm 2xl:text-2xl">
                Institute Name
              </th>
              <th className="text-primary font-normal text-xs lg:text-sm 2xl:text-2xl">
                Members
              </th>
            </tr>
          </thead>
          <tbody>
            {forums.map((forum, i) => (
              <Row forum={forum} key={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
