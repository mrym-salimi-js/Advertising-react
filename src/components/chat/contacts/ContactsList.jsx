import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ContactItem } from './ContactItem';
import { getAd } from '../../../services/getAd';
import { useParams } from 'react-router-dom';

export default function ContactsList({
  pvShow,
  setPvShow,
  setContactList,
  contactList,
}) {
  const [contacts, setContacts] = useState([]);
  const contactName = useRef();
  const params = useParams();
  const [newContact, setNewContact] = useState([]);

  // Get Contacts List
  useEffect(() => {
    const getContacts = async () => {
      const baseURL = import.meta.env.VITE_BASE_URL;
      try {
        const contectList = await axios.get(
          `${baseURL}/api/chat/chatContacts`,
          {
            // headers: {
            //   Authorization: `Bearer ${userToken}`,
            // },
            withCredentials: true,
          }
        );
        // console.log(contectList.data);
        if (contectList.data.status === 'success') {
          setContacts(contectList.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  // Set New Contact For Starting New Chat
  useEffect(() => {
    const getAdById = async () => {
      const res = await getAd(params.adId);

      setNewContact([
        {
          adId: res.data._id,
          adName: res.data.title,
          createAd: res.data.createAd,
          photoPath: 'img',
          photo: res.data.photo,
        },
      ]);
    };
    params?.adId && getAdById();
  }, []);

  useEffect(() => {
    const isExistContact = contactList?.find((con) => {
      return con._id === newContact?.adId && true;
    });

    !isExistContact && setContactList(contacts.concat(newContact));
  }, [contacts, newContact]);
  return (
    <div
      className={`p-2 h-full gap-2 overflow-scroll border-r bg-[rgb(43,58,62)] ${
        pvShow
          ? `hidden lg:w-[30%] lg:flex lg:flex-col `
          : `w-full lg:w-[30%] flex flex-col `
      }`}
    >
      {contactList !== undefined || contactList?.length > 0 ? (
        contactList?.map((contact, index) => {
          return (
            <ContactItem
              key={index}
              index={index}
              contactName={contactName}
              contact={contact}
              setPvShow={setPvShow}
            />
          );
        })
      ) : (
        <p className='text-md text-gray-50 text-center'>پیامی یافت نشد :(</p>
      )}
    </div>
  );
}
