function Accordion({ data, open, index, handleFaq }) {
  return (
    <div className="py-6" onClick={() => handleFaq(index)}>
      <div className="flex items-center justify-between pl-3 pr-2 py-3 font-bold text-2xl cursor-pointer tracking-wide">
        {data.question}
        <button>
          <svg
            className="w-5 h-5 fill-current"
            viewBox="0 0 469.33333 469.33333"
            xmlns="http://www.w3.org/2000/svg"
            hidden={open ? false : true}
          >
            <path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
          </svg>
          <svg
            className="w-5 h-5 fill-white"
            viewBox="0 -192 469.33333 469"
            xmlns="http://www.w3.org/2000/svg"
            hidden={open ? true : false}
          >
            <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0" />
          </svg>
        </button>
      </div>

      <div className="p-3" hidden={open ? false : true}>
        <p className="mb-3 w-11/12">{data.answer}</p>
      </div>
    </div>
  );
}

export default Accordion;
