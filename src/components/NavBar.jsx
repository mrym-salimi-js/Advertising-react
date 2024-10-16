import { useLocation, useNavigate } from 'react-router-dom';
import { CirclePlus, Speaker, User } from './globals/Icons';
import { linkTo } from '../functions/globals/linkTo';

export default function NavBar() {
  const navigateTo = useNavigate();
  const locationUrl = useLocation();
  const navIconSelected = (li, event, href) => {
    const navLis = document.querySelectorAll('.nav-li');

    navLis.forEach((liTag) => {
      liTag.children[0].classList.remove('text-[#84105C]');
    });

    li.children[0].classList.add('text-[#84105C]');

    // Set Last Url In LocalStorage Before Change Url
    localStorage.setItem('last-url-pathname', locationUrl.pathname);
    localStorage.setItem('last-url-search', locationUrl.search);

    linkTo(event, navigateTo, href);
  };

  return (
    <nav className='w-full  h-16 xl:hidden  bg-white  border-t-[1px] border-[#f3f3f3] fixed bottom-0  m-auto left-0 right-0 z-[1000]'>
      <ul className='w-full h-full flex gap-2 justify-around items-center'>
        <li className='nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500 '>
          <a
            href='/s/iran'
            onClick={(event) =>
              navIconSelected(event.currentTarget, event, '/s/iran')
            }
            className='flex flex-col gap-2 items-center'
          >
            <Speaker color={'#84105C'} size={'size-6'} />
            <p className='text-sm text-[#84105C]'>آگهی ها</p>
          </a>
        </li>

        <li className='nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500'>
          <a
            href='/newad'
            onClick={(event) =>
              navIconSelected(event.currentTarget, event, '/newAd')
            }
            className='flex flex-col gap-2 items-center'
          >
            <CirclePlus color={'#84105C'} size={'size-6'} />
            <p className='text-sm text-gray-500'>آگهی جدید</p>
          </a>
        </li>
        <li className='nav-li h-full flex items-center cursor-pointer hover:border-t-4 border-pink-500'>
          <a
            href='/myAccount'
            onClick={(event) =>
              navIconSelected(event.currentTarget, event, '/myAccount')
            }
            className='flex flex-col gap-2 items-center'
          >
            <User color={'#858383'} size={'size-6'} />
            <p className='text-sm text-gray-500'>حساب من</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}
