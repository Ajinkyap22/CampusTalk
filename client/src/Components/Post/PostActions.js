function PostActions({ upvotes, comments }) {
  return (
    <div className="w-full flex justify-between py-1 items-center pr-2 border-t">
      {/* upvotes */}
      <button className="m-2">
        <svg
          width="20"
          viewBox="0 0 20 20"
          fill="none"
          className="inline mx-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6507 1.97919C10.3332 1.58335 9.66657 1.58335 9.34907 1.97919L2.6824 10.3125C2.5846 10.4352 2.52338 10.583 2.50576 10.7389C2.48815 10.8948 2.51485 11.0525 2.58282 11.1939C2.65078 11.3353 2.75724 11.4546 2.88998 11.5383C3.02271 11.6219 3.17635 11.6664 3.33324 11.6667H6.66657V17.5C6.66657 17.721 6.75437 17.933 6.91065 18.0893C7.06693 18.2456 7.27889 18.3334 7.4999 18.3334H12.4999C12.7209 18.3334 12.9329 18.2456 13.0892 18.0893C13.2454 17.933 13.3332 17.721 13.3332 17.5V11.6667H16.6666C16.8235 11.6664 16.9771 11.6219 17.1098 11.5383C17.2426 11.4546 17.349 11.3353 17.417 11.1939C17.485 11.0525 17.5117 10.8948 17.494 10.7389C17.4764 10.583 17.4152 10.4352 17.3174 10.3125L10.6507 1.97919ZM12.4999 10H11.6666V16.6667H8.33324V10H5.0674L9.9999 3.83419L14.9324 10H12.4999Z"
            fill="#484848"
          />
        </svg>

        <span className="text-sm">{upvotes.length}</span>

        <svg
          width="20"
          viewBox="0 0 20 20"
          fill="none"
          className="inline mx-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.34926 18.0208C9.66676 18.4166 10.3334 18.4166 10.6509 18.0208L17.3176 9.68748C17.4154 9.56481 17.4766 9.41704 17.4942 9.26114C17.5119 9.10524 17.4851 8.94754 17.4172 8.80613C17.3492 8.66473 17.2428 8.54535 17.11 8.46172C16.9773 8.37809 16.8237 8.33358 16.6668 8.33331H13.3334L13.3334 2.49998C13.3334 2.27896 13.2456 2.067 13.0894 1.91072C12.9331 1.75444 12.7211 1.66665 12.5001 1.66665L7.5001 1.66665C7.27908 1.66665 7.06712 1.75444 6.91084 1.91072C6.75456 2.067 6.66676 2.27896 6.66676 2.49998L6.66676 8.33331L3.33343 8.33331C3.17654 8.33358 3.02291 8.37809 2.89017 8.46172C2.75743 8.54535 2.65097 8.66473 2.58301 8.80613C2.51505 8.94754 2.48834 9.10524 2.50596 9.26114C2.52357 9.41704 2.58479 9.56481 2.6826 9.68748L9.34926 18.0208ZM7.5001 9.99998H8.33343L8.33343 3.33331H11.6668L11.6668 9.99998L14.9326 9.99998L10.0001 16.1658L5.0676 9.99998H7.5001Z"
            fill="#484848"
          />
        </svg>
      </button>

      {/* comment */}
      <button className="m-2">
        <svg
          width="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline mx-1"
        >
          <path
            d="M5.83333 6.66665H14.1667H5.83333ZM5.83333 9.99998H9.16667H5.83333ZM10 16.6666L6.66667 13.3333H4.16667C3.72464 13.3333 3.30072 13.1577 2.98816 12.8452C2.67559 12.5326 2.5 12.1087 2.5 11.6666V4.99998C2.5 4.55795 2.67559 4.13403 2.98816 3.82147C3.30072 3.50891 3.72464 3.33331 4.16667 3.33331H15.8333C16.2754 3.33331 16.6993 3.50891 17.0118 3.82147C17.3244 4.13403 17.5 4.55795 17.5 4.99998V11.6666C17.5 12.1087 17.3244 12.5326 17.0118 12.8452C16.6993 13.1577 16.2754 13.3333 15.8333 13.3333H13.3333L10 16.6666Z"
            stroke="#484848"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm">Comment</span>
      </button>

      {/* comment number */}
      <button className="text-sm m-2 text-secondary">
        {comments.length} Comments
      </button>
    </div>
  );
}

export default PostActions;