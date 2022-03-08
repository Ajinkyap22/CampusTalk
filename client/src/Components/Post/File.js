import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Swipe from "react-easy-swipe";
import "./File.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function File({ files, onPostClick, classes, fullScreen = false }) {
  const [currentFile, setCurrentFile] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isPDF, setIsPDF] = useState(false);

  useEffect(() => {
    // check if the file is a pdf
    if (files[currentFile].type === "application/pdf") {
      setIsPDF(true);
    } else {
      setIsPDF(false);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsPDF(true);
  }

  function changePage(diff) {
    setPageNumber(pageNumber + diff);
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
    <div className={classes} onClick={onPostClick}>
      <AiOutlineLeft
        onClick={handleClick.bind(this, "left")}
        className="pageChange absolute left-0 text-3xl top-[45%] bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer"
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
            // if file is a .mp4 or .mkv or .mpeg-4
            ((file.endsWith(".mp4") ||
              file.endsWith(".mkv") ||
              file.endsWith(".mpeg-4")) && (
              <video
                src={`http://localhost:3000/uploads/videos/${file}`}
                key={i}
                alt=""
                className="mx-auto w-full h-full object-cover"
                hidden={i !== currentFile}
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
                <AiOutlineLeft
                  className="pageChange absolute left-0 text-4xl inset-y-1/2 bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer z-10"
                  hidden={pageNumber === 1}
                  onClick={() => changePage(-1)}
                />
                <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
                <AiOutlineRight
                  className="pageChange absolute right-0 text-4xl inset-y-1/2 bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer z-10"
                  hidden={pageNumber === numPages}
                  onClick={() => changePage(1)}
                />
              </Document>
            ))
        )}
      </Swipe>
      <AiOutlineRight
        onClick={handleClick.bind(this, "right")}
        className="pageChange absolute right-0 top-[45%] bg-[rgba(0,0,0,0.5)] rounded text-3xl inset-y-1/2 text-white cursor-pointer"
        hidden={files.length === 1 || currentFile === files.length - 1}
      />

      {/* show current image number on the top right */}
      <span
        hidden={files.length === 1}
        className="text-sm bg-[rgba(10,10,10,0.5)] rounded p-1 px-2 text-white absolute top-1 right-1"
      >
        {currentFile + 1}/{files.length}
      </span>

      {/* show current page number on the bottom center */}
      <div
        className="text-center text-sm bg-[rgba(0,0,0,0.7)] p-2.5 text-white absolute w-full bottom-0"
        hidden={!isPDF || fullScreen}
      >
        Page {pageNumber} out of {numPages}
      </div>

      {/* show current page number on the top-right */}
      <span
        className="text-sm bg-[rgba(10,10,10,0.5)] rounded p-1 px-2 text-white absolute top-1 right-1"
        hidden={!isPDF}
      >
        {pageNumber}/{numPages}
      </span>
    </div>
  );
}

export default File;
