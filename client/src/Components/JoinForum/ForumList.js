import ListItem from "./ListItem";

function ForumList({ forums }) {
  return (
    <table className="table-auto w-full" hidden={forums ? false : true}>
      <thead>
        <tr>
          <th className="text-primary font-normal">Institute Name</th>
          <th className="text-primary font-normal">Members</th>
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
