import React, { useRef, useEffect, useState } from "react";
import styling from "./AddChannels.module.css";
import { MdClose } from "react-icons/md";
import { RiFacebookFill, RiAmazonFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { salesChannelAction } from "../../../redux/actions/actions";
import firebase from "../../../firebase/firebase";
import { notify, ToastContainer } from "../../Notify/Notify";

function AddChannels({ toggleChannel }) {
  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state.user);
  let salesChannel = useSelector((state) => state.salesChannel);

  let [facebook, setFacebook] = useState("");
  let [instagram, setInstagram] = useState("");
  let [youtube, setYoutube] = useState("");
  let [amazon, setAmazon] = useState("");
  let [updateChannel, setUpdateChannel] = useState(false);
  // console.log(salesChannel);

  useEffect(() => {
    if (salesChannel.facebook) {
      setFacebook(salesChannel.facebook);
      setInstagram(salesChannel.instagram);
      setYoutube(salesChannel.youtube);
      setAmazon(salesChannel.amazon);
      setUpdateChannel(true);
    }
  }, [salesChannel]);

  // update channels
  let updateChannels = () => {
    if (
      facebook.length > 6 ||
      instagram.length > 6 ||
      youtube.length > 6 ||
      amazon.length > 6
    ) {
      let userSalesChannels = {
        facebook,
        instagram,
        youtube,
        amazon,
      };
      const db = firebase.firestore();
      db.collection("shops")
        .doc(userInfo.shopName)
        .update({
          userSalesChannels,
        })
        .then(() => {
          dispatch(salesChannelAction({ ...userSalesChannels }));
          notify("success", "Updated data successfully");
          console.log("Updated data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("You probably missing something");
    }
  };

  //  Register Channel

  let registerChannels = () => {
    if (
      facebook.length > 6 ||
      instagram.length > 6 ||
      youtube.length > 6 ||
      amazon.length > 6
    ) {
      let userSalesChannels = {
        facebook,
        instagram,
        youtube,
        amazon,
      };
      const db = firebase.firestore();
      db.collection("shops")
        .doc(userInfo.shopName)
        .set(
          {
            userSalesChannels,
          },
          { merge: true }
        )
        .then(() => {
          dispatch(salesChannelAction({ ...userSalesChannels }));
          notify("success", "Added data successfully");
          console.log("Added data successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert("You probably missing something");
    }
  };

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
    <>
      <div className={styling.AddChannels}>
        <div className={styling.AddChannelsInner}>
          <div className={styling.closeIconDiv}>
            <MdClose
              className={styling.closeIcon}
              onClick={() => toggleChannel()}
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
              <input
                type="text"
                ref={inputRef1}
                onKeyDown={firstKeyDown}
                placeholder="enter facebook link"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div>
              <div>
                <FiInstagram className={styling.socialIcons} /> Instagram
              </div>
              <input
                type="text"
                ref={inputRef2}
                onKeyDown={secondKeyDown}
                placeholder="enter instagram link"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div>
              <div>
                <AiOutlineYoutube className={styling.socialIcons} /> Youtube
              </div>
              <input
                type="text"
                ref={inputRef3}
                onKeyDown={thirdKeyDown}
                placeholder="enter youtube link"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </div>
            <div>
              <div>
                <RiAmazonFill className={styling.socialIcons} /> Amazon
              </div>
              <input
                type="text"
                ref={inputRef4}
                onKeyDown={forthKeyDown}
                placeholder="enter amazon link"
                value={amazon}
                onChange={(e) => setAmazon(e.target.value)}
              />
            </div>

            {updateChannel ? (
              <button
                ref={inputRef5}
                className={styling.confirmButton}
                onClick={() => {
                  toggleChannel();
                  updateChannels();
                }}
              >
                Update
              </button>
            ) : (
              <button
                ref={inputRef5}
                className={styling.confirmButton}
                onClick={() => {
                  toggleChannel();
                  registerChannels();
                }}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddChannels;
