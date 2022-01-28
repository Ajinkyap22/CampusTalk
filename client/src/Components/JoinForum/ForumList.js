import ListItem from "./ListItem";

function ForumList({ forums }) {
  return (
    <table className="table-fixed w-full" hidden={forums ? false : true}>
      <thead>
        <tr>
          <th className="text-primary font-normal text-sm lg:text-base xl:text-lg 2xl:text-2xl">
            Institute Name
          </th>
          <th className="text-primary font-normal text-sm lg:text-base xl:text-lg 2xl:text-2xl">
            Members
          </th>
        </tr>
      </thead>

      <tbody>
        {forums.map((forum, i) => (
          <ListItem forum={forum} key={i} />
        ))}
      </tbody>
    </table>
  );
}

export default ForumList;
