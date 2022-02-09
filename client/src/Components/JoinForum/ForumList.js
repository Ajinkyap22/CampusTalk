import ListItem from "./ListItem";

function ForumList({ forums, setShowAlert }) {
  return (
    <table className="table-fixed w-full" hidden={forums ? false : true}>
      <thead>
        <tr>
          <th className="text-primary font-normal text-xs lg:text-sm lg:text-base 2xl:text-2xl">
            Institute Name
          </th>
          <th className="text-primary font-normal text-xs lg:text-sm lg:text-base 2xl:text-2xl">
            Members
          </th>
        </tr>
      </thead>

      <tbody>
        {forums.map((forum, i) => (
          <ListItem forum={forum} key={i} setShowAlert={setShowAlert} />
        ))}
      </tbody>
    </table>
  );
}

export default ForumList;
