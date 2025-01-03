import { useEffect, useRef } from 'react';
import { ArrowDown, Document } from '../../globals/Icons';
// import moment from 'moment';
import 'moment/locale/fa'; // Load Persian (Farsi) locale for relative time
import momentJalaali from 'moment-jalaali';
momentJalaali.loadPersian({ usePersianDigits: true });

export function ChatContent({
  setFileDlStatus,
  selectedAd,
  messages,
  decodedJwt,
}) {
  const scrollRef = useRef();

  // Auto Scroll Down In Caht
  useEffect(() => {
    const chatScrollBox = scrollRef?.current;
    chatScrollBox && (chatScrollBox.scrollTop = chatScrollBox.scrollHeight);
  });
  // Download File Settings
  const handleDownloadFile = async (event) => {
    // event.preventDefault();

    try {
      const href = decodeURI(event.target.closest('a').href);
      const hrefBreacks = href.split('/');
      const fileName = decodeURI(hrefBreacks[hrefBreacks.length - 1]);
      const donlodedFile = localStorage.getItem('downloadedFiles');
      if (donlodedFile?.includes(fileName)) return;
      // await fetch(href);

      localStorage.setItem(
        'downloadedFiles',
        donlodedFile ? [...[donlodedFile], [fileName]] : [fileName]
      );
      setFileDlStatus(fileName);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='w-full h-[90%] flex items-end border-t border-b  overflow-hidden  bg-[#e2e2e2]'>
      <ul
        ref={scrollRef}
        className='w-full h-full p-2 flex flex-col gap-3 items-end overflow-scroll'
      >
        {selectedAd && (
          <li
            className={`self-start max-w-[80%] py-2 px-3 rounded-lg flex flex-col gap-2 bg-white shadow-sm `}
          >
            <div className='w-full flex flex-col gap-3'>
              <img className='w-full h-20 rounded-lg border overflow-hidden'></img>
              <p className='text-[0.7rem] '>{selectedAd[0].title}</p>
            </div>
          </li>
        )}
        {messages?.length > 0 &&
          messages.map((item) => {
            return item.type === 'file' ? (
              <ContentFileItem
                decodedJwt={decodedJwt}
                item={item}
                handleDownloadFile={handleDownloadFile}
                key={item._id}
              />
            ) : (
              <ContentTextItem
                decodedJwt={decodedJwt}
                item={item}
                key={item._id}
              />
            );
          })}
      </ul>
    </div>
  );
}

export function ContentFileItem({ decodedJwt, item, handleDownloadFile }) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  return (
    <>
      <li
        className={`${
          decodedJwt?.id === item.senderId ? `self-start` : `self-end`
        } max-w-[80%] h-22 p-2 rounded-lg flex flex-row-reverse gap-3 bg-white shadow-sm `}
      >
        {/* File Icin */}
        <a
          onClick={(event) => handleDownloadFile(event)}
          className=' h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center'
          href={`${baseURL}/chat/${item.senderId}-${item.reciverId}-${
            item.adId
          }/${decodeURI(item.message).replace(/ /g, '-')}`}
          download={item.message}
        >
          {!localStorage.getItem('downloadedFiles')?.includes(item.message) && (
            <ArrowDown size={'size-6'} color={'#ffffff'} stroke={2} />
          )}

          {/* {fileDlStatus === 'loading' && <SpinnerLoading />} */}

          {localStorage.getItem('downloadedFiles')?.includes(item.message) && (
            <Document size={'size-6'} color={'#ffffff'} stroke={2} />
          )}
        </a>
        {/* File Info */}
        <div className='flex flex-col gap-1 '>
          <p className='text-[0.7rem]'>{item.message}</p>
          <div className='flex gap-2 flex-row-reverse'>
            <p className='text-gray-500 text-[0.6rem]'>
              {item.size?.toString()?.split('').map(Number).length > 6
                ? `${(item.size / (1024 * 1024)).toFixed(2)`mb`}`
                : `${(item.size / 1024).toFixed(2)} kb`}
            </p>
            <p className='text-gray-500 text-[0.6rem]'>
              {item.message.split('.').slice(-1)[0].toUpperCase()}
            </p>
          </div>
          <p className='text-[0.6rem] text-gray-300 self-start '>
            {momentJalaali(item.createAt).locale('fa').fromNow()}
          </p>
        </div>
      </li>
    </>
  );
}
export function ContentTextItem({ decodedJwt, item }) {
  return (
    <li
      className={`${
        decodedJwt?.id === item.senderId ? `self-start` : `self-end`
      } max-w-[80%] py-2 px-4 rounded-lg justify-between flex gap-2 bg-white shadow-sm `}
    >
      <p className='max-w-[80%] overflow-hidden text-[0.7rem] text-wrap'>
        {item.message}
      </p>
      <p className='text-[0.6rem] text-gray-300 self-end'>
        {momentJalaali(item.createAt).locale('fa').fromNow()}
      </p>
    </li>
  );
}
