import { useState } from 'react';
import LocationBox from '../locations/LocationBox';
import { useCookies } from 'react-cookie';
import { citiesList } from '../../functions/localStorage/locations';
import { mapMerker } from '../globals/Icons';

export default function SearchBar() {
  const [openLocation, setOpenLocation] = useState(false);
  const [cookie] = useCookies();

  const cities = citiesList();

  return (
    <div className='w-full xl:w-[60%] h-20  flex justify-center items-center z-[10000] '>
      <div className='w-[95%] h-[70%] border border-gray-200 z-20 rounded-xl flex gap-2 justify-between'>
        {/*Input */}
        <input
          className='outline-none w-[70%] lg:w-[93%] md:w-[85%]  h-full p-3 bg-transparent text-gray-400 placeholder-gray-300 text-[0.8rem] z-30 text-right '
          placeholder='جستجو در همه آگهی ها'
        ></input>

        {/*Icon And Selected Cities  */}
        <div className='w-32 py-2 px-3 flex flex-row-reverse gap-1 items-center justify-around border-r-[1px]'>
          <img className='w-[28px]' src={mapMerker}></img>

          {cookie['cities']?.length > 0 ? (
            cities?.map((city) => {
              if (city.id == cookie['cities'][0]) {
                const citiesLength = cookie['cities'].length;
                return (
                  <p
                    onClick={() => setOpenLocation(!openLocation)}
                    className='text-[0.8rem] text-gray-400 cursor-pointer  text-nowrap'
                    key={city.id}
                  >
                    {citiesLength ? `${citiesLength} شهر` : city.name}
                  </p>
                );
              }
            })
          ) : (
            <p
              onClick={() => setOpenLocation(!openLocation)}
              className='text-[0.8rem] text-gray-400 cursor-pointer text-nowrap'
            >
              همه ایران
            </p>
          )}
        </div>
      </div>
      {openLocation && <LocationBox setOpenLocation={setOpenLocation} />}
    </div>
  );
}
