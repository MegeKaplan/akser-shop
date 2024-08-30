import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toastifyEmitterConfig } from "../config/toastifyConfig";

const AuthForm: React.FC = () => {
  const { page } = useParams();
  const [signUp, setSignUp] = useState(page === "login" ? false : true || true);
  const [isValid, setIsValid] = useState(false);
  const [authData, setAuthData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const { token, setToken } = useAppContext();
  const { userId, setUserId } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    signUp ? navigate("/auth/register") : navigate("/auth/login");
  }, [signUp]);

  // signUp ? (document.title = "Kaydol") : (document.title = "Giriş Yap");

  const validateAuthData = (data: {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone_number: string;
  }) => {
    const errors: string[] = [];

    if (!data.name.trim() && signUp) {
      errors.push(MESSAGES.NAME_REQUIRED);
    }

    if (!data.surname.trim() && signUp) {
      errors.push(MESSAGES.SURNAME_REQUIRED);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errors.push(MESSAGES.EMAIL_REQUIRED);
    } else if (!emailRegex.test(data.email)) {
      errors.push(MESSAGES.EMAIL_INVALID);
    }

    if (!data.password.trim()) {
      errors.push(MESSAGES.PASSWORD_REQUIRED);
    } else if (data.password.length < 6) {
      errors.push(MESSAGES.PASSWORD_LENGTH);
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!data.phone_number.trim() && signUp) {
      errors.push(MESSAGES.PHONE_REQUIRED);
    } else if (!phoneRegex.test(data.phone_number) && signUp) {
      errors.push(MESSAGES.PHONE_INVALID);
    }

    if (errors.length === 0) {
      setIsValid(true);
    }
    return errors;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
    setIsValid(
      validateAuthData({ ...authData, [e.target.name]: e.target.value })
        .length === 0
    );
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateAuthData(authData);
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      try {
        const response = signUp
          ? await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/register`,
              authData
            )
          : await axios.post(
              `${import.meta.env.VITE_API_URL}/auth/login`,
              authData
            );

        setToken(response.data.response.token);
        setUserId(String(response.data.response.userId));

        if (response.status === 201) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, Number(toastifyEmitterConfig.autoClose));
        } else {
          toast.error(response.data.message);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-auto h-auto  md:h-[90vh] flex items-center justify-center flex-col md:flex-row md:m-5 md:rounded-3xl overflow-hidden md:border">
      <div className="relative md:mb-0 mb-5 w-full h-72 md:w-2/5 md:h-full md:before:hidden before:opacity-50 before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:top-0 before:left-0 select-none">
        <img
          className="w-full h-full object-cover"
          src="https://snappix.netlify.app/app/imgs/bg_auth.jpg"
        />
        <h1 className="text-white text-6xl md:hidden absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full text-center">
          {signUp ? "Kaydol" : "Giriş Yap"}
        </h1>
      </div>
      <form
        onSubmit={formSubmitHandler}
        className="w-full h-3/5 md:w-3/5 md:h-full flex items-center justify-center"
      >
        <div className="w-11/12 h-5/6 sm:w-[28rem] lg:w-[30rem] sm:h-auto md:h-auto bg-secondary-150 border rounded-lg">
          <div className="w-full border-b">
            <h1 className="text-5xl hidden md:flex items-center justify-center flex-col p-5 pb-7">
              {signUp ? "Kaydol" : "Giriş Yap"}
            </h1>
          </div>
          <div className="p-2 lg:p-10">
            {signUp && (
              <>
                <div className="flex-col border p-2 overflow-hidden rounded-md mb-2">
                  <label className="font-semibold p-2" htmlFor="name">
                    İsim
                  </label>
                  <input
                    className="w-full p-2 outline-none rounded bg-none mt-1"
                    value={authData.name}
                    onChange={onChangeHandler}
                    name="name"
                    type="text"
                    placeholder="İsminizi girin"
                  />
                </div>
                <div className="flex-col border p-2 overflow-hidden rounded-md mb-2">
                  <label className="font-semibold p-2" htmlFor="surname">
                    Soyisim
                  </label>
                  <input
                    className="w-full p-2 outline-none rounded bg-none mt-1"
                    value={authData.surname}
                    onChange={onChangeHandler}
                    name="surname"
                    type="text"
                    placeholder="Soyisminizi girin"
                  />
                </div>
              </>
            )}
            <div className="flex-col border p-2 overflow-hidden rounded-md mb-2">
              <label className="font-semibold p-2" htmlFor="email">
                E-Posta
              </label>
              <input
                className="w-full p-2 outline-none rounded bg-none mt-1"
                value={authData.email}
                onChange={onChangeHandler}
                name="email"
                // type="email"
                type="text"
                placeholder="E-Posta adresinizi girin"
              />
            </div>
            <div className="flex-col border p-2 overflow-hidden rounded-md mb-2">
              <label className="font-semibold p-2" htmlFor="password">
                Şifre
              </label>
              <input
                className="w-full p-2 outline-none rounded bg-none mt-1"
                value={authData.password}
                onChange={onChangeHandler}
                name="password"
                type="password"
                placeholder="Şifrenizi girin"
              />
            </div>
            {signUp && (
              <div className="flex-col border p-2 overflow-hidden rounded-md mb-2">
                <label className="font-semibold p-2" htmlFor="phone_number">
                  Telefon Numarası
                </label>
                <input
                  className="w-full p-2 outline-none rounded bg-none mt-1"
                  value={authData.phone_number}
                  onChange={onChangeHandler}
                  name="phone_number"
                  type="tel"
                  placeholder="Telefon numaranızı girin"
                />
              </div>
            )}
            <button
              className={`border p-2.5 overflow-hidden rounded-md w-full transition disabled:bg-primary-100 disabled:text-primary-500 disabled:cursor-not-allowed mb-2 ${
                !isValid
                  ? "bg-primary-100 text-primary-500 cursor-not-allowed hover:bg-primary-100 "
                  : "bg-primary-500 text-white hover:bg-primary-600"
              }`}
              // disabled={!isValid}
            >
              {signUp ? "Kayıt Ol" : "Giriş Yap"}
            </button>
            <span
              onClick={() => setSignUp(!signUp)}
              className="cursor-pointer flex items-center justify-center"
            >
              <span className="mr-1">
                {signUp ? "Zaten hesabın var mı?" : "Bir hesabın yok mu?"}
              </span>
              <span className="text-blue-500">
                {signUp ? "Giriş Yap" : "Şimdi Kayıt Ol"}
              </span>
              .
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
