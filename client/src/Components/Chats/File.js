function File({ file, user, sender }) {
  return (
    <div
      className={`flex items-center relative mt-2 mx-auto bg-white border-[5px] rounded shadow-base max-w-xs cursor-pointer ${
        sender._id === user._id ? "border-primary-light" : "border-white"
      }`}
    >
      <img
        src={`http://localhost:3000/uploads/images/${file}`}
        alt=""
        className="mx-auto w-full h-full object-cover"
      />
    </div>
  );
}

export default File;
