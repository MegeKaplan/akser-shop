interface Messages {
  CONTENT_LOADING: string;
  ERROR_OCCURRED: string;
  PRODUCT_NOT_FOUND: string;
  CATEGORY_NOT_FOUND: string;
  NAME_REQUIRED: string;
  SURNAME_REQUIRED: string;
  EMAIL_REQUIRED: string;
  EMAIL_INVALID: string;
  PASSWORD_REQUIRED: string;
  PASSWORD_LENGTH: string;
  PHONE_REQUIRED: string;
  PHONE_INVALID: string;
}

export const MESSAGES: Messages = {
  CONTENT_LOADING: "İçerik yükleniyor...",
  ERROR_OCCURRED: "Bir hata oluştu!",
  PRODUCT_NOT_FOUND: "Ürün bulunamadı!",
  CATEGORY_NOT_FOUND: "Kategori bulunamadı!",
  NAME_REQUIRED: "İsim boş bırakılamaz!",
  SURNAME_REQUIRED: "Soyisim boş bırakılamaz!",
  EMAIL_REQUIRED: "E-posta boş bırakılamaz!",
  EMAIL_INVALID: "Geçersiz e-posta adresi!",
  PASSWORD_REQUIRED: "Şifre boş bırakılamaz!",
  PASSWORD_LENGTH: "Şifre en az 6 karakter olmalıdır!",
  PHONE_REQUIRED: "Telefon numarası boş bırakılamaz!",
  PHONE_INVALID: "Geçersiz telefon numarası!",
};
