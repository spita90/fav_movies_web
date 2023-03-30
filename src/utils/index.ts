import { toast } from "react-toastify";

export enum ToastType {
  error,
  info,
}
/**
 * Shows a toast message to the app user
 * @param message the message to display
 * @param color the background color (default red)
 * @param duration ms, time before the toast fades out (default 3000)
 */
export const showToast = (
  message: string,
  type: ToastType = ToastType.error,
  duration: number = 5000
) => {
  const options = {
    autoClose: duration,
    closeOnClick: true,
    draggable: false,
    pauseOnHover: true,
  };
  switch (type) {
    case ToastType.error:
      toast.error(message, options);
      break;
    case ToastType.info:
      toast.info(message, options);
  }
};

/**
 * To be used for non-blocking errors (this will not render an ErrorPage)
 * @param error The Error to handle
 * @param fatal Set to true to reset data (default: false)
 * @param displayToast Set to false to avoid showing a Toast (default: true)
 */
export const errorHandler = (
  error: Error | any,
  fatal: boolean = false,
  displayToast: boolean = true
) => {
  if (!error) return;
  if (displayToast && error.hasOwnProperty("message")) {
    showToast(error.message);
  }
  if (fatal) {
    localStorage.clear();
  }
};

export const capitalize = (string: string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;
