import { Header } from '../../../components/header/Header';
import NavBar from '../../../components/NavBar';
import Cookies from 'js-cookie';

import ChatPV from './ChatPV';
import ContactsList from './ContactsList';
import { useState } from 'react';

export default function MyAccount() {
  const userToken = Cookies.get('user-Token');
  const [pvShow, setPvShow] = useState();

  return (
    <div className='w-[98%] sm:w-[85%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
      <Header />

      {/*Chat Box */}
      <div className='w-full flex lg:w-[80%] relative border rounded-xl overflow-hidden mt-5'>
        {/*Contacts List */}
        <ContactsList
          userToken={userToken}
          pvShow={pvShow}
          setPvShow={setPvShow}
        />
        {/*Chat PV*/}
        <ChatPV userToken={userToken} pvShow={pvShow} setPvShow={setPvShow} />
      </div>
      <NavBar />
    </div>
  );
}