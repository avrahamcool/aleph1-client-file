import { ClientFile } from './client-file';
declare global {
    interface File {
        /**
         * a wrapper around File.readAsDataURL that uses Promises instead of callbacks
         *
         * @returns {Promise<string>}
         * @memberof File
         */
        readAsDataURLAsync(): Promise<string>;
        /**
         * convert a File to a ClientFile - ready to post as JSON.
         *
         * @returns {Promise<ClientFile>}
         * @memberof File
         */
        toClientFile(): Promise<ClientFile>;
    }
}
export {};
