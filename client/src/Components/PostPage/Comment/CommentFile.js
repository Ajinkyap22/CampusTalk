function CommentFile({ file, type }) {
  return (
    <div>
      {file && type === "image" ? (
        <img
          src={`http://localhost:3000/uploads/images/${file}`}
          alt=""
          className="mx-auto p-2 rounded-xl w-full h-full object-cover"
        />
      ) : (
        file && (
          <video
            src={`http://localhost:3000/uploads/videos/${file}`}
            alt=""
            className="mx-auto p-2 rounded-xl w-full h-full object-cover"
            controls
            hidden={!file}
          />
        )
      )}
    </div>
  );
}

export default CommentFile;
