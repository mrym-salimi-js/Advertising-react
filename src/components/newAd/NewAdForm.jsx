import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { PhotoComponent } from './PhotoComponent';
import TextComponent from '../formFileds/text/TextComponent';
import UserType from './UserType';
import ToggleSwich from '../formFileds/ToggleSwich';
import NotifToast from '../globals/NotifToast';
import { getCategoriyAttr } from '../../functions/newAd/getCategoryAttr';
import { sendNewAd } from '../../functions/newAd/sendNewAd';
import { Map } from '../map/Map';
import { FormHeader } from './FormHeader';
import { SubmiteFormBtn } from './SubmiteFormBtn';
import { useNavigate } from 'react-router-dom';
import SingleSelectedSupport from './SingleSelectedSupport';

export const NewAdContext = createContext();
export function NewAdForm() {
  //Form Local Storage Setting
  const formData = new FormData();
  const [adsCategoriesList, setAdsCategoriesList] = useState();
  const [adsLocationList, setAdsLocationsList] = useState();
  const [validation, setValidation] = useState();
  const [newAdStorageValue, setNewAdStorageValue] = useState();
  const basicNewAdStorage = {
    category: { dependencies: [], lable: '', id: '' },
    location: { dependencies: [], lable: '', id: '' },
    description: '',
    title: '',
    photo: [],
    userType: 'فرد',
    phone: false,
    chat: false,
  };

  useEffect(() => {
    document.title = 'ثبت آگهی';

    const values = JSON.parse(localStorage.getItem('form-list-values'));
    values && setNewAdStorageValue(values);

    !values &&
      localStorage.setItem(
        'form-list-values',
        JSON.stringify(basicNewAdStorage)
      );

    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    cats && setAdsCategoriesList(cats);

    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));
    locs && setAdsLocationsList(locs);
  }, []);

  useEffect(() => {
    newAdStorageValue !== undefined &&
      localStorage.setItem(
        'form-list-values',
        JSON.stringify(newAdStorageValue)
      );
  }, [newAdStorageValue]);

  const adTitleLable = 'عنوان آگهی';
  const adDescLable = 'توضیحات';
  const adTitleSubTitle = 'عنوان مناسبی برای آگهی تان وارد کنید.';
  const adDescSubTitle = 'توضیحات مناسبی برای آگهی تان وارد کنید.';

  //Get Form category Attributes Items
  const getCatAttrs = getCategoriyAttr(adsCategoriesList, newAdStorageValue);

  const catAttr = getCatAttrs?.attributes;
  const placeHolder = getCatAttrs?.placeholder;

  //Form Submit
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [attrs, setAttrs] = useState([]);

  const navigateTo = useNavigate();
  const [notifToast, setNotifToast] = useState({ message: '', status: '' });
  const [sendLoading, setSendLoading] = useState(false);
  //Send Form
  useEffect(() => {
    const sendingForm = async () => {
      const res = await sendNewAd(
        newAdStorageValue,
        attrs,
        formData,
        navigateTo
      );

      res.data.status === 'success'
        ? setNotifToast({
            message: 'آگهی شما با موفقیت ثبت شد',
            status: 'success',
          })
        : setNotifToast({
            message: 'در ثبت آگهی خطایی رخ داده',
            status: 'fail',
          });

      setSendLoading(false);
    };

    if (
      newAdStorageValue &&
      formSubmitted &&
      ((validation && Object?.keys(validation)?.length == 0) ||
        validation === undefined)
    ) {
      setSendLoading(true);
      sendingForm();
    }
  }, [formSubmitted]);

  return (
    <>
      {notifToast.message && (
        <NotifToast setNotif={setNotifToast} notif={notifToast} />
      )}
      <div className='w-[97%] lg:w-[90%] p-3 flex flex-col  gap-8 bg-white'>
        <NewAdContext.Provider
          value={{
            setNewAdStorageValue,
            newAdStorageValue,
            basicNewAdStorage,
            setValidation,
            validation,
            catAttr,
            setAttrs,
            attrs,
            setFormSubmitted,
            formData,
          }}
        >
          {/* Form Header*/}
          <FormHeader />
          <form className='flex flex-col gap-4 lg:flex-row-reverse justify-between mt-7'>
            <div className='w-full  lg:w-[50%]  flex flex-col gap-8'>
              {/* Select Photo*/}
              <PhotoComponent />
              {/* New Ad Btn */}
              <SubmiteFormBtn sendLoading={sendLoading} />
            </div>

            <div className='lg:w-[47%] p-3 flex flex-col gap-12 '>
              {/* Categories*/}
              <SingleSelectedSupport
                lable={'دسته بندی'}
                allList={adsCategoriesList}
                storagePram={'category'}
              />

              {/*Categories Attributes*/}
              {catAttr?.map((item, index) => {
                if (item.type == 1 || item.type == 6 || item.type == 0) {
                  return (
                    <TextComponent
                      key={index}
                      adLable={item.name}
                      storagePram={item.id}
                      filedType={'text'}
                      type={'newAd'}
                      setNewAdStorageValue={setNewAdStorageValue}
                      newAdStorageValue={newAdStorageValue}
                      setValidation={setValidation}
                      validation={validation}
                    />
                  );
                } else if (item.type == 2) {
                  return (
                    <SingleSelectedSupport
                      key={index}
                      lable={item.name}
                      allList={item.value.options}
                      storagePram={item.id}
                    />
                  );
                } else if (item.type == 7) {
                  return (
                    <ToggleSwich
                      lable={item.name}
                      storagePram={item.id}
                      key={index}
                      setNewAdStorageValue={setNewAdStorageValue}
                      newAdStorageValue={newAdStorageValue}
                    />
                  );
                }
              })}

              {/* Ad Title*/}
              <TextComponent
                adLable={adTitleLable}
                storagePram={'title'}
                textLength={'short'}
                subFiled={placeHolder ? placeHolder.title : adTitleSubTitle}
                filedType={'text'}
                type={'newAd'}
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
                setValidation={setValidation}
                validation={validation}
              />

              {/* Ad Description*/}
              {
                <TextComponent
                  adLable={adDescLable}
                  storagePram={'description'}
                  textLength={'long'}
                  subFiled={
                    placeHolder ? placeHolder.description : adDescSubTitle
                  }
                  filedType={'text'}
                  type={'newAd'}
                  setNewAdStorageValue={setNewAdStorageValue}
                  newAdStorageValue={newAdStorageValue}
                  setValidation={setValidation}
                  validation={validation}
                />
              }
              {/* Location*/}
              <SingleSelectedSupport
                lable={'مکان'}
                allList={adsLocationList}
                storagePram={'location'}
              />
              {/* Map*/}
              <Map
                width={'100%'}
                lat={
                  newAdStorageValue?.location.lat
                    ? newAdStorageValue?.location.lat
                    : 35.696111
                }
                lon={
                  newAdStorageValue?.location.lon
                    ? newAdStorageValue?.location.lon
                    : 51.423056
                }
                page={'newAd'}
                zoom={14}
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
              />
              {/* User Type*/}
              <UserType storagePram={'userType'} />

              <ToggleSwich
                lable='تماس تلفنی'
                desc='با فعال سازی این گزینه، شماره تماس شما در آگهی نمایش داده می شود'
                storagePram='phone'
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
              />

              <ToggleSwich
                lable='چت'
                desc='با فعال سازی این گزینه امکان چت با کاربر برای شما فراهم می شود'
                storagePram='chat'
                setNewAdStorageValue={setNewAdStorageValue}
                newAdStorageValue={newAdStorageValue}
              />
            </div>
          </form>
        </NewAdContext.Provider>
      </div>
    </>
  );
}
