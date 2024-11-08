import route from './route';
import {
} from './modules/index'

export default {
    IRR: 'ریال',
    $vuetify:{
        stepper:{
            next: 'Next'
        }
    },
    route,
    table: {
        actions: 'عملیات'
    },
    ui: {
        row: 'ردیف',
        removeFile: 'حذف فایل',
        error: 'خطا!',
        cancel: 'لغو',
        close: 'بستن',
        continue: 'ادامه',
        back: 'قبلی',
        see: 'مشاهده',
        select: 'انتخاب',
        submit: 'تأیید',
        register: 'ثبت',
        search: 'جستجو',
        edit: 'ویرایش',
        delete: 'حذف',
        loginToAccount: 'ورود به حساب کاربری',
        enterWordToSearch: 'کلمه‌ای را برای جستجو وارد نمایید',
        login: 'ورود',
        yes: 'بله',
        no: 'خیر',
        logout: 'خروج از حساب کاربری',
        actions: 'عملیات',
        profile: 'پروفایل',
        save: 'ذخیره',
        clearFilter: 'پاک کردن فیلتر',
        openInNewPage: 'باز کردن در صفحۀ جدید',
        saveChanges: 'ذخیرۀ تغییرات',
        copyToClipboardSuccess: 'کپی به کلیپ‌بورد با موفقیت انجام شد.',
        deleteForm: 'پاک کردن فرم',
        details: 'جزئیات',
        downloadExcel: 'دانلود فایل اکسل',
        seeChart: 'مشاهده نمودار',
        recordFounded: 'تعداد <strong>{countOfRecords}</strong> رکورد یافت شد.',
        requestTime: 'تاریخ درخواست : <strong>{requestTime}</strong>',
        deleteItem: 'حذف آیتم',
        deleteItemQuestion: 'آیا مایل به حذف این آیتم می‌باشید؟',
        addItemSuccess: 'افزودن آیتم با موفقیت انجام شد!',
        addItemFailed: 'افزودن آیتم با خطا مواجه شد!',
        updateItemSuccess: 'بروزرسانی آیتم با موفقیت انجام شد!',
        deleteItemSuccess: 'حذف آیتم با موفقیت انجام شد!',
        deleteItemFailed: 'حذف آیتم با خطا مواجه شد!',
        updateItemFailed: 'بروزرسانی آیتم با خطا مواجه شد!',
        untitled: 'بدون عنوان',
        uploadNewFile: 'آپلود فایل جدید',
        pickFile: 'انتخاب فایل',
        notSelectedFile: 'فایلی انتخاب نشده است.',
        changeFile: 'تغییر فایل',
    },
    profile: {
        title: 'پروفایل کاربری',
        name: 'نام',
        family: 'نام خانوادگی',
        phoneNumber: 'تلفن همراه',
        uploadNewPhoto: 'آپلود عکس جدید',
        removePhoto: 'حذف عکس',
        changePassword: {
            title: 'تغییر کلمۀ عبور',
            currentPassword: 'کلمۀ عبور فعلی',
            newPassword: 'کلمۀ عبور جدید',
            newPasswordSubmit: 'تأیید کلمۀ عبور جدید',
            changePasswordSuccess: 'تغییر کلمۀ عبور با موفقیت انجام شد!',
        },
    },
    authentication: {
        username: 'نام کاربری', password: 'کلمۀ عبور', login: 'ورود',
    },
    errors: {
        fixErrorsMessage: 'لطفا خطاهای بوجود آمده را برطرف نمایید.',
        requiredThisField: 'تکمیل این فیلد اجباری است!',
        fieldAcceptsNumberOnly: 'ورود حروف غیرمجاز است و تنها ورود اعداد قابل قبول می‌باشد!',
        fieldAcceptsNumberOnlyBetweenRangeZeroTo999: 'تنها اعدادی که در بازۀ ارقام 0 الی 999 باشد مجاز است!',
        noItemForDownload: 'آیتمی برای دانلود کردن وجود ندارد!',
        noConnectionToServer: 'دسترسی به سرور وجود ندارد!',
        serverError: 'خطای سمت سرور وجود دارد!',
        serverError_YouNotAccessPermissionThisSection: 'اجازه دسترسی برای شما به این بخش وجود ندارد!',
    },
    timeRangeItems: {
        title: 'بازه زمانی',
        recent12Hour: '12 ساعت أخیر',
        recent3Days: '3 روز أخیر',
        recent15Days: '15 روز أخیر',
        recentMonth: 'یک ماه أخیر',
        recent6Month: 'شش ماه أخیر',
        customTimeRange: 'بازه زمانی دلخواه',
        startTime: 'زمان شروع',
        endTime: 'زمان پایان',
        noSelectedTimeError: 'تاریخی برای فیلتر کردن وارد نشده است!',
    },
    validation: {
        thisFieldIsRequired: 'این فیلد اجباری است!'
    },
};

