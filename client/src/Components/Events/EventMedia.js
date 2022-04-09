import { withRouter } from "react-router-dom";
import { useRef } from "react";

function EventMedia({ video, doc, name, images, history }) {
  const videoRef = useRef();
  const docRef = useRef();
  const imageRef = useRef();

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

  function handleFileInput(ref) {
    // trigger click on the ref
    ref.current.click();
  }

  return (
    <div className="col-span-2">
      {/* event doc */}
      <section className="text-center my-8 w-2/3">
        <h2 className="text-xl my-4 text-primary dark:text-primary-light">
          Information Document
        </h2>

        {doc ? (
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
        ) : (
          <div>
            <span className="text-secondary dark:text-gray-300">
              There are no documents
            </span>

            <button
              className="mt-4 block mx-auto hover:scale-125 transition-all"
              onClick={() => handleFileInput(docRef)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 fill-[#818181] dark:fill-gray-300 mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>

            <span className="mt-2 block text-secondary dark:text-gray-300">
              Click here to add a document
            </span>

            {/* docs input - accept only pdf|doc|docx|ppt|pptx|xls|xlsx */}
            <input
              // onChange={handleDocFileChange}
              ref={docRef}
              type="file"
              name="file"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              data-max-size="10485760"
            />
          </div>
        )}
      </section>

      {/* event video */}
      <section className="my-8 text-center w-2/3">
        <h2 className="text-xl my-4 text-primary dark:text-primary-light">
          Video
        </h2>

        {video ? (
          <video
            src={`http://localhost:3000/uploads/videos/${video}`}
            controls
            className="w-full h-full"
          />
        ) : (
          <div>
            <span className="text-secondary dark:text-gray-300">
              There are no videos
            </span>

            <button
              className="mt-4 block mx-auto hover:scale-125 transition-all"
              onClick={() => handleFileInput(videoRef)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 fill-[#818181] dark:fill-gray-300 mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>

            <span className="mt-2 block text-secondary dark:text-gray-300">
              Click here to add a video
            </span>

            {/* video inputm accept only videos */}
            <input
              // onChange={handleVideoFileChange}
              ref={videoRef}
              type="file"
              name="file"
              accept="video/*"
              className="hidden"
              data-max-size=" 10485760"
            />
          </div>
        )}
      </section>

      {/* images */}
      <section className="my-8 text-center w-2/3">
        <h2 className="text-xl my-4 text-primary dark:text-primary-light">
          Images
        </h2>

        {images && images.length > 0 ? (
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
        ) : (
          <div>
            <span className="text-secondary dark:text-gray-300">
              There are no images
            </span>

            <button
              className="mt-4 block mx-auto hover:scale-125 transition-all"
              onClick={() => handleFileInput(imageRef)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 fill-[#818181] dark:fill-gray-300 mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>

            <span className="mt-2 block text-secondary dark:text-gray-300">
              Click here to add images
            </span>
            <span className="mt-2 block text-sm text-secondary dark:text-gray-300">
              (You can add upto 5 images)
            </span>

            {/* docs input - accept only pdf|doc|docx|ppt|pptx|xls|xlsx */}
            <input
              // onChange={handleDocFileChange}
              ref={imageRef}
              type="file"
              name="file"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              data-max-size="10485760"
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default withRouter(EventMedia);
