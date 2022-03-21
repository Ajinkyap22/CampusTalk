import moment from "moment";

function Message({ message, user }) {
  return (
    <div
      className={`flex ${
        message.sender._id === user._id ? "flex-row-reverse" : "flex-row"
      } px-3 pt-2 py-1`}
    >
      {/* message */}
      <div>
        <div
          className={`${
            message.sender._id === user._id
              ? "bg-primary-light text-white dark:text-darkLight"
              : "bg-white dark:bg-darkLight shadow"
          } p-1.5 rounded-lg text-sm`}
        >
          {message.text}
        </div>

        {/* time */}
        <div
          className={`${
            message.sender._id === user._id ? "text-right" : "text-left"
          } text-xs text-secondary dark:text-gray-300 p-1`}
        >
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    </div>
  );
}

export default Message;
