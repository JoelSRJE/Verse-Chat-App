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
    <div className="flex flex-row justify-center items-center min-h-16 bg-[#000000]/80">
      <div className="flex gap-4 mr-4">
        <button className="text-white hover:scale-110 transition-all duration-100">
          <CiImageOn className="scale-150" />
        </button>
        <button className="text-white hover:scale-110 transition-all duration-100">
          <CiCamera className="scale-150" />
        </button>
        <button className="text-white hover:scale-110 transition-all duration-100">
          <CiMicrophoneOn className="scale-150" />
        </button>
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex: 1 w-3/5 h-[3rem] text-base p-2 border-none outline-none rounded-lg hover:scale-105 transition-all duration-200"
      />
      <div className="relative flex items-center gap-4 ml-4">
        <div
          className="text-white cursor-pointer hover:scale-105 transition-all duration-200"
          onClick={() => setOpenPicker(!openPicker)}
        >
          <CiFaceSmile className="scale-150" />
          <div className="absolute bottom-12 right-1">
            <EmojiPicker open={openPicker} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="w-auto h-1/2 p-2 bg-greenHighlight rounded-lg border-[1px] border-transparent text-white hover:bg-transparent hover:border-greenHighlight hover:scale-105 transition-all duration-200"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
