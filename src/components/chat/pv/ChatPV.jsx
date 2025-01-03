import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { SendFileProtalChildren } from '../protals/SendFileProtalChildren';
import { ChatHeader } from './ChatHeader';
import { ChatContent } from './ChatContent';
import ChatSender from './ChatSender';
import { useParams } from 'react-router-dom';
import { getAd } from '../../../services/getAd';

export default function ChatPV({ userToken, pvShow, contactList }) {
  const decodedJwt = userToken && jwtDecode(userToken);
  const [messages, setMessages] = useState([]);
  const msgInput = useRef();
  const fileInput = useRef();
  const params = useParams();
  const adId = params.adId;
  const [selectedAd, setSelectedAd] = useState();
  const [selectedFiles, setSelectedFiles] = useState();

  // Just foe rerender page and change download Icon
  const [fileDlStatus, setFileDlStatus] = useState();

  const baseURL = import.meta.env.VITE_BASE_URL;
  // Backend url
  const socket = io(`${baseURL}`);

  // Get Each Message Text By every Sending
  useEffect(() => {
    socket.on('message', ({ senderId, reciverId, message }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          message,
          type: 'text',
        },
      ]);
    });

    return () => socket.off('message');
  }, []);

  // Get Each Message File By every Sending
  useEffect(() => {
    socket.on('file', ({ senderId, reciverId, fileInfo }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          message: fileInfo.fileName,
          type: 'file',
        },
      ]);
    });

    return () => socket.off('file');
  }, []);

  // Get All Message Of Chat
  useEffect(() => {
    setMessages([]);

    const messages = async () => {
      const msgList = await axios.get(
        `${baseURL}/api/chat/chatMessages/${adId}`,
        {
          // headers: {
          //   Authorization: `Bearer ${userToken}`,
          // },
          withCredentials: true,
        }
      );

      msgList && setMessages([]),
        msgList.data.data.message.map((item) => {
          setMessages((prevMessages) => [...prevMessages, item]);
        }),
        msgList.data.data.ad && setSelectedAd(msgList.data.data.ad);
    };
    adId && messages();
  }, [params]);

  // Get User And Reciver Id
  const [senderId, setSenderId] = useState();
  const [reciverId, setReciverId] = useState();
  useEffect(() => {
    // UserId
    const getUser = async () => {
      const user = await axios.get(`${baseURL}/api/users/checkAuth`, {
        withCredentials: true,
      });
      user && setSenderId(user.data.data._id);
    };
    getUser();

    // ReciverId
    const ad = async () => {
      const ad = await getAd(adId);

      setReciverId(ad.adCreator._id);
    };
    adId !== undefined && ad();
  }, []);

  // Send Message
  const handleSendingMsg = () => {
    const files = fileInput.current?.files;

    const message = msgInput.current?.value;

    if (files.length > 0) {
      Object.keys(files).forEach((item) => {
        const file = files[item];
        const fileInfo = {
          file: file,
          fileName: file.name.replace(/ /g, '-'),
          size: file.size,
        };
        socket.emit('uploadFile', { adId, senderId, reciverId, fileInfo });
        const downloadeds = localStorage.getItem('downloadedFiles');
        localStorage.setItem(
          'downloadedFiles',
          downloadeds ? [...[downloadeds], [file.name]] : [file.name]
        );
        setFileDlStatus(file.name);
        setSelectedFiles('');
      });
    }

    message &&
      socket.emit('sendMessage', { adId, senderId, reciverId, message });
    msgInput.current.value = '';
    fileInput.current.value = '';
  };

  return (
    <div
      className={` h-full  overflow-hidden justify-between py-2  ${
        pvShow
          ? `w-full lg:w-[70%] flex flex-col `
          : `hidden lg:w-[70%] lg:flex flex-col `
      }`}
    >
      {/* Sending File Protal */}
      {selectedFiles && (
        <SendFileProtalChildren
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          handleSendingMsg={handleSendingMsg}
        />
      )}
      {pvShow && (
        <>
          {/*Chat Header */}
          <ChatHeader contactList={contactList} />
          {/*Chat Content */}
          <ChatContent
            selectedAd={selectedAd}
            setFileDlStatus={setFileDlStatus}
            messages={messages}
            decodedJwt={decodedJwt}
          />

          {/*Message Sender Box */}
          <ChatSender
            setSelectedFiles={setSelectedFiles}
            fileInput={fileInput}
            msgInput={msgInput}
            handleSendingMsg={handleSendingMsg}
          />
        </>
      )}
    </div>
  );
}
