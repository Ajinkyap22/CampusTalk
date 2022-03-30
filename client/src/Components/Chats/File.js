import { withRouter } from "react-router-dom";

function File({
  file,
  user,
  sender,
  type = "image",
  originalFileName,
  history,
}) {
  function handleClick() {
    history.push(`/chats/media/${file}`);
  }

  return (
    <div
      className={`flex items-center mt-2 mx-auto bg-white rounded shadow-base max-w-xs cursor-pointer ${
        sender._id === user._id && type !== "doc"
          ? "border-[5px] border-primary-light"
          : "border-[5px] border-white"
      }`}
    >
      {type === "image" && (
        <img
          src={`http://localhost:3000/uploads/images/${file}`}
          onClick={handleClick}
          alt=""
          className="mx-auto w-full h-full object-cover"
        />
      )}

      {type === "video" && (
        <video
          src={`http://localhost:3000/uploads/videos/${file}`}
          alt=""
          className="mx-auto w-full h-full object-cover"
          controls
        />
      )}

      {type === "doc" && (
        <div
          className="flex items-center justify-center w-full h-full p-2 rounded"
          onClick={handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current text-primary-light border-r-2 border-primary-light"
          >
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V18H10V13H13Z" />
          </svg>

          <span className="ml-2 block">{originalFileName.name}</span>
          {/* file size in kb or mb */}
          {originalFileName.size && (
            <span className="ml-2 text-secondary text-sm">
              {originalFileName.size > 1024
                ? `${(originalFileName.size / 1024).toFixed(2)} MB`
                : `(${originalFileName.size || 852} KB)`}
            </span>
          )}

          {/* open icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current text-primary-light ml-2"
          >
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default withRouter(File);
