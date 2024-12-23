import { useEffect, useState } from 'react';
import Menu from '../../components/user/menu/Menu';
import { AdCart } from '../../components/advertisements/AdCart';
import axios from 'axios';
import { Plus } from '../../components/globals/Icons';
import { Link } from 'react-router-dom';
import { getAd } from '../../services/getAd';
import ThreePointsLoading from '../../components/globals/ThreePointsLoading';

export default function MySavedAds() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [mySaved, setMySaved] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMyAds = async () => {
      setLoading(true);
      const savedAdIds = await axios.get(`${baseURL}/api/users/me`, {
        withCredentials: true,
      });

      if (savedAdIds || savedAdIds.data.data.savedAd) {
        savedAdIds.data.data.savedAd.forEach(async (i) => {
          const ad = await getAd(i);
          setMySaved((prev) => [...prev, ad.data]);
        });
        setLoading(false);
      }
    };
    getMyAds();
  }, []);

  return (
    <div className='w-full h-full bg-gray-50 flex flex-col gap-5 px-3 lg:px-7 items-end '>
      <Menu />
      <div className='w-full  h-full md:w-[66%]  lg:w-[76%] xl:w-[81%] p-2 pt-6 flex flex-col items-center gap-24'>
        {/* Header */}
        <div className='w-[98%] h-40 sticky top-6 z-50 rounded-3xl shadow-sm bg-[rgb(206,198,164)] '>
          <p className='w-full mt-16 text-center text-gray-50 text-md'>
            آگهی های ذخیره شده
          </p>
          <div className='w-auto flex gap-12 items-center'>
            <Link
              to={'/newAd'}
              className='w-40 h-40 bg-[rgb(206,198,164)] flex flex-col items-center justify-center gap-3 relative bottom-3 rounded-full border-[5px] border-white right-9'
            >
              <Plus color={'#f3f3f3'} size={'size-8'} />
              <p className='text-md text-gray-50'>ثبت آگهی جدید</p>
            </Link>
          </div>
        </div>
        <div className='w-full h-auto  overflow-x-scroll p-8 px-4 bg-white rounded-3xl border'>
          <div className='w-auto h-auto flex gap-3 gap-y-10 mt-4 justify-start'>
            {loading ? (
              <div className='w-full flex items-center justify-center'>
                <ThreePointsLoading />
              </div>
            ) : mySaved.length > 0 ? (
              mySaved?.map((ad, index) => {
                return <AdCart key={index} adItem={ad} />;
              })
            ) : (
              <p className='w-full text-center text-md text-gray-200'>
                آگهی یافت نشد :(
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
