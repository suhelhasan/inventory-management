import React, { useRef, useEffect } from "react";
import styling from "./AddChannels.module.css";
import { MdClose } from "react-icons/md";
import { RiFacebookFill, RiAmazonFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";

function AddChannels({ showAddChannel }) {
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  useEffect(() => {
    inputRef1.current.focus();
  }, []);

  let firstKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef2.current.focus();
    }
  };
  let secondKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef3.current.focus();
    }
  };
  let thirdKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef4.current.focus();
    }
  };
  let forthKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef5.current.focus();
    }
  };

  return (
    <div className={styling.AddChannels}>
      <div className={styling.AddChannelsInner}>
        <div className={styling.closeIconDiv}>
          <MdClose
            className={styling.closeIcon}
            onClick={() => showAddChannel()}
          />
        </div>
        <div className={styling.formContent}>
          <h2 className={styling.formHeading}>
            Enter your social channel links here
          </h2>

          <div>
            <div>
              <RiFacebookFill className={styling.socialIcons} /> Facebook
            </div>
            <input type="text" ref={inputRef1} onKeyDown={firstKeyDown} />
          </div>
          <div>
            <div>
              <FiInstagram className={styling.socialIcons} /> Instagram
            </div>
            <input type="text" ref={inputRef2} onKeyDown={secondKeyDown} />
          </div>
          <div>
            <div>
              <AiOutlineYoutube className={styling.socialIcons} /> Youtube
            </div>
            <input type="text" ref={inputRef3} onKeyDown={thirdKeyDown} />
          </div>
          <div>
            <div>
              <RiAmazonFill className={styling.socialIcons} /> Amazon
            </div>
            <input type="text" ref={inputRef4} onKeyDown={forthKeyDown} />
          </div>
          <button
            ref={inputRef5}
            className={styling.confirmButton}
            onClick={() => {
              showAddChannel();
              alert("Data Added");
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddChannels;
