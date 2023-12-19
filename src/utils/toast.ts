import { enqueueSnackbar, closeSnackbar, OptionsWithExtraProps } from "notistack";

const toast = (message: string, type: string, options?: OptionsWithExtraProps<any>) => enqueueSnackbar(message, {
  ...options,
  variant: type as any,
});

toast.error = (e: any) => toast(e?.message ?? e, "error");
toast.success = (message: string) => toast(message, "success");
toast.warning = (message: string) => toast(message, "warning");
toast.info = (message: string) => toast(message, "info");
toast.close = closeSnackbar;

export default toast;
