import { useState } from "react";

const faqData = [
  {
    question: "How do I post annonymously?",
    answer: "FAQ Answer 1",
  },

  {
    question: "Can I attach files to my posts?",
    answer: "FAQ Answer 2",
  },

  {
    question: "How can I leave a forum?",
    answer:
      "Visit the forums page that you want to leave and click on the 'Leave a Forum' button.",
  },
];

function FAQ() {
  const [currentFaq, setCurrentFaq] = useState(-1);

  const handleFaq = (index) => {
    if (index === currentFaq) setCurrentFaq(-1);
    else setCurrentFaq(index);
  };

  return (
    <div className="bg-white shadow-base pt-2 text-[#000000e6] my-8 w-[17rem] max-w-[17rem] rounded self-start">
      {/* title */}
      <h2 className="text-lg font-bold text-center">FAQ</h2>

      {/* questions */}
      <div>
        {faqData.map((data, index) => (
          <div key={index}>
            <div className="py-3" onClick={() => handleFaq(index)}>
              <div className="flex items-center justify-between text-sm cursor-pointer">
                {/* text */}
                <p className="px-3">{data.question}</p>

                {/* toggles */}
                <button className="pr-3">
                  {currentFaq === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="inline"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="inline"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                className={
                  currentFaq === index ? "px-3 py-2 pt-4 w-full" : "hidden"
                }
              >
                <p className="text-xs">{data.answer}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
