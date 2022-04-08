import { withRouter } from "react-router-dom";

function EventMedia({ video, doc, name, images, history }) {
  function handleClick() {
    history.push(`/media/${doc}`);
  }

  function handleImageClick(i) {
    history.push(`/media/${images[i]}`);
  }

  function handleDownload() {
    fetch(`http://localhost:3000/uploads/docs/${doc}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  }

  return (
    <div className="col-span-2">
      {/* event doc */}
      {doc && (
        <section className="text-center my-8 w-2/3">
          <h2 className="text-xl my-4 text-primary dark:text-primary-light">
            Information Document
          </h2>

          <div className="flex items-center bg-white w-full justify-between h-full p-2 rounded">
            {/* info */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-primary-light border-r-2 mx-1 border-primary-light inline"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V18H10V13H13Z" />
              </svg>

              <span className="ml-2">
                {name}.{doc.split(".")[1]}
              </span>
            </div>

            {/* actions */}
            <div className="flex items-center">
              {/* download button */}
              <button
                onClick={handleDownload}
                title="Download"
                className="p-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 stroke-primary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>

              {/* open icon */}
              <button onClick={handleClick} title="Open Document">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current text-primary-light ml-2 justify-self-end"
                >
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* event video */}
      {video && (
        <section className="my-8 text-center w-2/3">
          <h2 className="text-xl my-4 text-primary dark:text-primary-light">
            Video
          </h2>

          <video
            src={`http://localhost:3000/uploads/videos/${video}`}
            controls
            className="w-full h-full"
          />
        </section>
      )}

      {/* images */}
      {images && (
        <section className="my-8 text-center w-2/3">
          <h2 className="text-xl my-4 text-primary dark:text-primary-light">
            Images
          </h2>

          <div className="flex flex-wrap justify-center">
            {images.map((image, i) => (
              <img
                src={`http://localhost:3000/uploads/images/${image}`}
                alt={image}
                key={i}
                onClick={() => handleImageClick(i)}
                className="m-2 cursor-pointer"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default withRouter(EventMedia);
