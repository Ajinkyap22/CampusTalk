import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Swipe from "react-easy-swipe";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function File({ files }) {
  const [currentFile, setCurrentFile] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleClick(direction) {
    if (direction === "left") {
      if (currentFile === 0) return;
      setCurrentFile(currentFile - 1);
    } else {
      if (currentFile === files.length - 1) return;
      setCurrentFile(currentFile + 1);
    }
  }

  return (
    <div className="flex items-center relative mt-2 mx-auto bg-black max-w-fit">
      <AiOutlineLeft
        onClick={handleClick.bind(this, "left")}
        className="absolute left-0 text-3xl top-[40%] bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer"
        hidden={files.length === 1 || currentFile === 0}
      />
      <Swipe
        onSwipeLeft={handleClick.bind(this, "left")}
        onSwipeRight={handleClick.bind(this, "right")}
      >
        {/* for each file */}
        {files.map(
          (file, i) =>
            // if it is an image or gif
            ((file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".png") ||
              file.endsWith(".gif")) && (
              <img
                src={`http://localhost:3000/uploads/images/${file}`}
                key={i}
                alt=""
                className="mx-auto w-full h-full object-cover"
                hidden={i !== currentFile}
              />
            )) ||
            // if file is a video
            (file.endsWith(".mp4") && (
              <video
                src={`http://localhost:3000/uploads/videos/${file}`}
                key={i}
                alt=""
                className="mx-auto w-full h-full object-cover"
                hidden={i !== currentFile}
                // show controls
                controls
              />
            )) ||
            // if file is a document
            (file.endsWith(".pdf") && (
              <Document
                file={`http://localhost:3000/uploads/docs/${file}`}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                key={i}
                hidden={i !== currentFile}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            ))
        )}
      </Swipe>
      <AiOutlineRight
        onClick={handleClick.bind(this, "right")}
        className="absolute right-0 top-[40%] bg-[rgba(0,0,0,0.5)] rounded text-3xl inset-y-1/2 text-white cursor-pointer"
        hidden={files.length === 1 || currentFile === files.length - 1}
      />

      {/* show current image number on the top right */}
      <span
        hidden={files.length === 1}
        className="text-sm bg-[rgba(10,10,10,0.5)] rounded p-1 px-2 text-white absolute top-1 right-1"
      >
        {currentFile + 1}/{files.length}
      </span>
    </div>
  );
}

export default File;
