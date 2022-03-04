function Caption({ formData, setFormData }) {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleTextInput(e) {
    setFormData({ ...formData, text: e.target.value });
  }

  return (
    <div className="p-2">
      <textarea
        name="text"
        cols="30"
        rows="1"
        className="p-2 w-full rounded text-sm focus:outline-none focus:border-gray-500 overflow-hidden"
        placeholder="Write something..."
        onKeyDown={handleKeyDown}
        onChange={handleTextInput}
      ></textarea>
    </div>
  );
}

export default Caption;
