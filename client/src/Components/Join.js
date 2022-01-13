function Join() {
  // TODO - Reduce cellspacing for table headers

  return (
    <div className="w-full bg-bubble flex relative flex-col justify-start items-center">
      <h1 className="text-5xl font-bold my-2 mt-10 text-primary">Join Forum</h1>
      <h2 className="my-2 text-primary text-xl">
        Select your institute's forum to join
      </h2>

      <section className="bg-white rounded shadow-lg w-[90%] md:w-[60%] 2xl:w-1/3 my-10 mb-20">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-primary">Institute Name</th>
              <th className="text-primary">Members</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-center py-4">
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>
                <button className="px-5 py-1.5 m-2 mx-6 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded-full hover:bg-blue-700">
                  Join
                </button>
              </td>
            </tr>
            <tr className="text-center py-4">
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>
                <button className="px-5 py-1.5 m-2 mx-6 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded-full hover:bg-blue-700">
                  Join
                </button>
              </td>
            </tr>
            <tr className="text-center py-4">
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>
                <button className="px-5 py-1.5 m-2 mx-6 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded-full hover:bg-blue-700">
                  Join
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-4 mb-10 w-1/3 mx-auto text-center">
          <p className="text-primary font-bold">
            Can't find your institute in ths list? Just create your institute's
            forum!
          </p>

          <button className="px-5 py-2 mt-5 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded-full hover:bg-blue-700">
            Create Forum
          </button>
        </div>
      </section>
    </div>
  );
}

export default Join;
