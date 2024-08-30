import { Bounce, ToastOptions } from "react-toastify";

const toastifyConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const toastifyContainerConfig: ToastOptions = {
  ...toastifyConfig,
};

export const toastifyEmitterConfig: ToastOptions = {
  ...toastifyConfig,
};
