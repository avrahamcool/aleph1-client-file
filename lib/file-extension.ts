import { ClientFile } from './client-file';


declare global
{
    interface File
    {
        /**
         * a wrapper around File.readAsDataURL that uses Promises instead of callbacks
         *
         * @returns {Promise<string>}
         * @memberof File
         */
        readAsDataURLAsync(): Promise<string>,

        /**
         * convert a File to a ClientFile - ready to post as JSON.
         *
         * @returns {Promise<ClientFile>}
         * @memberof File
         */
        toClientFile(): Promise<ClientFile>
    }
}

File.prototype.readAsDataURLAsync = function(): Promise<string>
{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = _ => resolve(reader.result as string);
        reader.onerror = _ => reject(new Error(`Error reading ${this.name}: ${reader.result}`));

        reader.readAsDataURL(this);
    })
}

File.prototype.toClientFile = async function(): Promise<ClientFile>
{
    const BASE_64_PREFIX = "base64,";

    const rawBase64String = await this.readAsDataURLAsync();
    const base64TrimPosition = rawBase64String.indexOf(BASE_64_PREFIX) + BASE_64_PREFIX.length;
    const base64String = rawBase64String.substring(base64TrimPosition);
    return {
        name: this.name,
        lastModified: this.lastModified,
        size: this.size,
        type: this.type,
        content: base64String
    };
} 

export {};