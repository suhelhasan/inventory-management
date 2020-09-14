import React, { useState } from "react";
import styling from "./ChannelLinks.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { RiFacebookFill, RiAmazonFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
// import { notify, ToastContainer } from "../../../Notify/Notify";

function ChannelLinks() {
  let channels = useSelector((state) => state.salesChannel);
  let [userChannels, setUserChannels] = useState([]);

  useEffect(() => {
    let selectedChannels = [];
    for (let channel of Object.entries(channels)) {
      if (channel[1].length > 6) {
        if (channel[0] === "facebook") {
          channel.push(<RiFacebookFill className={styling.socialIcons} />);
        } else if (channel[0] === "instagram") {
          channel.push(<FiInstagram className={styling.socialIcons} />);
        } else if (channel[0] === "amazon") {
          channel.push(<RiAmazonFill className={styling.socialIcons} />);
        } else if (channel[0] === "youtube") {
          channel.push(<AiOutlineYoutube className={styling.socialIcons} />);
        }

        selectedChannels.push(channel);
      }
    }
    // notify("success", "Updated data successfully");
    setUserChannels(selectedChannels);
  }, [channels]);

  console.log(userChannels);
  return (
    <>
      <div className={styling.ChannelLinks}>
        {userChannels.map((eachChannel) => (
          <a
            href={eachChannel[1]}
            alt={eachChannel[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styling.channel}>
              {eachChannel[2]} {eachChannel[0]}
            </div>
          </a>
        ))}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default ChannelLinks;
