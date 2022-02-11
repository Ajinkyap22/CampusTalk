function Filter({ activeFilter, setActiveFilter }) {
  function switchActiveFilter(filter) {
    setActiveFilter(filter);
  }

  return (
    <div className="bg-white shadow-base flex justify-between items-center">
      {/* filter label */}
      <p className="inline p-3 text-sm bg-[#f3f3f3]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          fill="#818181"
          className="inline align-text-bottom"
          viewBox="0 0 16 16"
        >
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
        </svg>{" "}
        Filter
      </p>

      {/* latest */}
      <button
        onClick={() => switchActiveFilter("latest")}
        className="p-3 text-sm"
      >
        <span
          className={`${
            activeFilter === "latest" ? "bg-[#E2EEFF] text-primary" : ""
          } p-1 px-2 rounded-xl`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 inline align-text-top"
            viewBox="0 0 20 20"
            fill={activeFilter === "latest" ? "#0278E4" : "#626262"}
          >
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Latest
        </span>
      </button>

      {/* important */}
      <button
        onClick={() => switchActiveFilter("important")}
        className="p-3 text-sm"
      >
        <span
          className={`${
            activeFilter === "important" ? "bg-[#E2EEFF] text-primary" : ""
          } p-1 px-2 rounded-xl`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="inline align-text-top"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.9165 15.825L12.0832 15.8333C12.6415 15.8333 13.1415 15.5583 13.4415 15.1333L17.0832 9.99999L13.4415 4.86666C13.1415 4.44166 12.6415 4.16666 12.0832 4.16666L2.9165 4.17499L6.94984 9.99999L2.9165 15.825Z"
              fill={activeFilter === "important" ? "#0278E4" : "#626262"}
            />
          </svg>{" "}
          Important
        </span>
      </button>

      {/* top */}
      <button onClick={() => switchActiveFilter("top")} className="p-3 text-sm">
        <span
          className={`${
            activeFilter === "top" ? "bg-[#E2EEFF] text-primary" : ""
          } p-1 px-2 rounded-xl`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="16"
            height="16"
            className="inline"
            viewBox="0 0 64 64"
          >
            <g fill={activeFilter === "top" ? "#0278E4" : "#626262"}>
              <path d="M21.539 38.05c0-1.322-.91-2.318-2.116-2.318H3.603c-1.209 0-2.118.996-2.118 2.318c0 1.287.921 2.26 2.146 2.26h5.495v17.813c0 1.299.986 2.198 2.397 2.198c1.416 0 2.406-.899 2.406-2.198V40.31h5.495c1.185 0 2.115-.993 2.115-2.26" />
              <path d="M31.05 35.3c-6.728 0-11.08 4.957-11.08 12.625c0 7.705 4.348 12.684 11.08 12.684c6.695 0 11.02-4.967 11.02-12.651c0-7.691-4.321-12.658-11.02-12.658m0 20.762c-3.815 0-6.184-3.104-6.184-8.104c0-5.02 2.369-8.142 6.184-8.142c3.78 0 6.127 3.056 6.127 7.966c.003 5.262-2.232 8.28-6.127 8.28" />
              <path d="M54.4 35.73h-6.376c-2.619 0-3.949 1.387-3.949 4.125v18.207c0 1.352.955 2.258 2.375 2.258c1.394 0 2.371-.916 2.371-2.228v-7.106h5.468c5.153 0 8.231-2.924 8.231-7.828c0-4.648-3.036-7.428-8.12-7.428m3.258 7.487c0 2.229-1.121 3.313-3.432 3.313H48.82v-6.312h5.406c2.311.001 3.432.981 3.432 2.999" />
              <path d="M37.825 29.542V19.236h2.887c1.697 0 3.093-1.625 3.259-3.708L30.978.583L18.071 15.522c.168 2.083 1.562 3.713 3.261 3.713h2.887v10.306l13.606.001" />
            </g>
          </svg>{" "}
          Top
        </span>
      </button>

      {/* day */}
      <button className="p-3 text-sm">
        <span className="bg-[#E2EEFF] text-primary p-1 px-2 rounded-xl">
          Today{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            fill="currentColor"
            className="inline"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default Filter;