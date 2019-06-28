/**
 * a file to upload as JSON using an HTTP client.
 *
 * @export
 * @interface ClientFile
 */
export interface ClientFile {
    /**
     * the name of the file
     *
     * @type {string}
     * @memberof ClientFile
     */
    name: string;
    /**
     * the last modified time of the file, in millisecond since the UNIX epoch (January 1st, 1970 at Midnight).
     *
     * @type {number}
     * @memberof ClientFile
     */
    lastModified: number;
    /**
     * the size of the file in bytes.
     *
     * @type {number}
     * @memberof ClientFile
     */
    size: number;
    /**
     * the MIME type of the file.
     *
     * @type {string}
     * @memberof ClientFile
     */
    type: string;
    /**
     * the file itself (as Base64 encoded byte[]).
     *
     * @type {string}
     * @memberof ClientFile
     */
    content: string;
}
