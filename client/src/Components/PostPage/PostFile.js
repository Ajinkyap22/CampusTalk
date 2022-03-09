import File from "../Post/File";

function PostFile({ post, handleBack }) {
  return (
    <section className="col-span-3 bg-black relative">
      {/* file */}
      {post.file.length ? (
        <File
          classes="flex items-center relative mx-auto bg-black max-w-fit"
          files={post.file}
          fullScreen={true}
        />
      ) : null}

      {/* back button */}
      <button
        onClick={handleBack}
        className="absolute left-5 top-4 bg-[rgba(255,255,255,0.2)] p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </section>
  );
}

export default PostFile;
