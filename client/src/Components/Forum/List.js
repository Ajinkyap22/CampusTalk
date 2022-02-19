import Row from "./Row";

function List({ forums }) {
  return (
    <table
      className="table-fixed w-[60%] m-auto bg-white shadow-base mt-8"
      hidden={forums.length === 0}
    >
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
          <Row forum={forum} key={i} />
        ))}
      </tbody>
    </table>
  );
}

export default List;
