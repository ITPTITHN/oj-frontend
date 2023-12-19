import { WebStorage } from "redux-persist/es/types";

const noobStorage: WebStorage = {
  // eslint-disable-next-line no-unused-vars
  getItem(_key: string): Promise<null|string> {
    return Promise.resolve(null);
  },
  // eslint-disable-next-line no-unused-vars
  removeItem(_key: string): Promise<void> {
    return Promise.resolve(undefined);
  },
  // eslint-disable-next-line no-unused-vars
  setItem(_key: string, item: unknown): Promise<void> {
    return Promise.resolve(undefined);
  },
};

export default noobStorage;
