import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { SendFileProtalChildren } from '../protals/SendFileProtalChildren';
import { ChatHeader } from './ChatHeader';
import { ChatContent } from './ChatContent';
import ChatSender from './ChatSender';
import { useParams } from 'react-router-dom';

export default function ChatPV({ pvShow, contactList }) {
  const [messages, setMessages] = useState([]);
  const msgInput = useRef();
  const fileInput = useRef();
  const params = useParams();
  const adIdInParams = params.adId;
  const [selectedAd, setSelectedAd] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [groupMsgs, setGroupMsgs] = useState();

  const [sended, setSended] = useState(false);
  const [senderId, setSenderId] = useState();
  const [reciverId, setReciverId] = useState();
  const [adId, setAdId] = useState();
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
          adId: adId,
          message,
          type: 'text',
        },
      ]);
    });

    return () => socket.off('message');
  }, [sended]);

  console.log(messages);

  // Get Each Message File By every Sending
  useEffect(() => {
    socket.on('file', ({ senderId, reciverId, fileInfo }) => {
      setMessages((prevMsg) => [
        ...prevMsg,
        {
          id: uuidv4(),
          senderId,
          reciverId,
          adId: adId,
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

    const getMessages = async () => {
      const msgList = await axios.get(
        `${baseURL}/api/chat/chatMessages/${adIdInParams}`,
        {
          withCredentials: true,
        }
      );

      msgList && setMessages([]),
        msgList.data.data.message.map((item) => {
          setMessages((prevMessages) => [...prevMessages, item]);
        }),
        msgList.data.data.ad && setSelectedAd(msgList.data.data.ad);
    };
    adIdInParams && getMessages();
    setSended(!sended);
  }, [params]);

  console.log(sended);
  // Groped Messages For Use In Ad Host Chat
  useEffect(() => {
    const separatedByAdId = messages?.reduce((acc, message) => {
      if (!acc[message.adId]) {
        acc[message.adId] = [];
      }
      acc[message.adId].push(message);
      return acc;
    }, {});

    setGroupMsgs(separatedByAdId);
  }, [messages]);

  // Get User And Reciver Id
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
    contactList?.map((con) => {
      if (con.chatId === adIdInParams) {
        setReciverId(con.chatId);
      }
    });

    // AdId
  }, [params]);

  useEffect(() => {
    const en = selectedAd !== undefined && Object.entries(selectedAd);

    setAdId(selectedAd !== undefined && en[en?.length - 1][1]._id);
  }, [selectedAd, params]);
  console.log(adId);

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
      className={` h-full  overflow-hidden justify-between  ${
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
          {contactList !== undefined && (
            <ChatHeader contactList={contactList} />
          )}
          {/*Chat Content */}
          <ChatContent
            selectedAd={selectedAd}
            setFileDlStatus={setFileDlStatus}
            messages={
              selectedAd !== undefined && selectedAd.length > 0
                ? groupMsgs
                : messages
            }
            senderId={senderId}
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
