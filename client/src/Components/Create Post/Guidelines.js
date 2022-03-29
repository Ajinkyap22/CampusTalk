const guidelines = [
  "1. Do not post anything that is offensive, racist, or that violates the law.",
  "2. Make sure you follow the forum rules while posting",
  "3. You can include upto 10 images in a post.",
  "4. You can inlcude only 1 video or document in a post.",
  "5. Max file size for video is 50 MB",
  "6. Max file size for document is 10 MB",
  "7. Max file size for images is 20 MB in total",
];

function Guidelines() {
  return (
    <div className="bg-white dark:bg-darkSecondary shadow-base max-w-[20rem] pb-2 my-2 rounded absolute left-2 top-[12%] mx-4">
      {/* title */}
      <div className="w-full bg-primary-light p-3 py-2 rounded-t">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          fill="white"
          className="inline mr-1 mb-1"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
          />
        </svg>
        <p className="text-white dark:text-darkLight text-xl inline">
          {" "}
          Guidelines
        </p>
      </div>

      {/* rules */}
      <div>
        {guidelines.map((guidline, i) => (
          <div
            className={`${
              guidelines[i + 1]
                ? "border-b border-[#cfcfcf] dark:border-secondary text-left"
                : ""
            } py-3 text-left`}
            key={i}
          >
            <p className="px-3 text-sm dark:text-darkLight">{guidline}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guidelines;
