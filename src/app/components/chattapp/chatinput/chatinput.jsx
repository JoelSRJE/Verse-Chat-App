import EmojiPicker from "emoji-picker-react";
import React from "react";
import {
  CiFaceSmile,
  CiMicrophoneOn,
  CiCamera,
  CiImageOn,
} from "react-icons/ci";

const ChatInput = ({
  openPicker,
  setOpenPicker,
  message,
  setMessage,
  sendMessage,
  handleEmoji,
}) => {
  return (
    <div className="flex flex-row justify-center items-center h-[4rem]">
      <div className="flex gap-4 mr-4">
        <button className="text-white">
          <CiImageOn className="scale-150" />
        </button>
        <button className="text-white">
          <CiCamera className="scale-150" />
        </button>
        <button className="text-white">
          <CiMicrophoneOn className="scale-150" />
        </button>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex: 1 w-3/5 h-[3rem] text-base p-2 border-none outline-none rounded-lg"
      />
      <div className="relative flex items-center gap-4 ml-4">
        <div
          className=" text-white "
          onClick={() => setOpenPicker(!openPicker)}
        >
          <CiFaceSmile className="scale-150" />
          <div className="absolute bottom-12 right-1">
            <EmojiPicker open={openPicker} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="w-auto h-1/2 p-2 bg-greenHighlight rounded-lg text-white hover:bg-green-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
