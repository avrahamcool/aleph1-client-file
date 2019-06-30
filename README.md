# aleph1-client-file

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/avrahamcool/aleph1-client-file.svg?style=flat)](https://github.com/avrahamcool/aleph1-client-file/issues)
[![NPMVersion](https://img.shields.io/npm/v/aleph1-client-file.svg?style=flat)](https://www.npmjs.com/package/aleph1-client-file)
[![NPMDownloads](https://img.shields.io/npm/dt/aleph1-client-file.svg?style=flat)](https://www.npmjs.com/package/aleph1-client-file) 
[![NPMSize](https://img.shields.io/bundlephobia/min/aleph1-client-file.svg?style=flat)](https://www.npmjs.com/package/aleph1-client-file)


aleph1-client-file is a JS library that make uploading files to a C# webAPI easy using a simple JSON POST request from any HTTPClient.
the request can contain single or multiple files, with or without additional metadata.
this package essentially introduce a new "primitive" File type, that can be send to server like any other primitive using JSON in a POST request.

this package is meant to be used along side with the C# nuget package [Aleph1.ClientFile.Models](https://www.nuget.org/packages/Aleph1.ClientFile.Models/)

## Installing

In your C# project, install the [`Aleph1.ClientFile.Models`](https://www.nuget.org/packages/Aleph1.ClientFile.Models/) nuget package.
now just use the ClientFile in your models just like any other primitive - the .net framework will bind to it automatically.

for example: you can create a model that holds a list of file + some other metadata.

```csharp
using Aleph1.ClientFile.Models;

namespace FileTest.Models
{
    /// <summary>A normal POCO class</summary>
    public class FileWrapper
    {
        /// <summary>arbitrary Data</summary>
        public string SomeData { get; set; }

        /// <summary>a list of files</summary>
        public ClientFile[] Files { get; set; }
    }
}
```

now in your controller, you just specify this type as input parameters.

```csharp
using FileTest.Models;
using System.IO;
using System.Web.Http;

namespace FileTest.WebAPI.Controllers
{
    /// <summary>a demo controller for handling files</summary>
    public class FilesController : ApiController
    {
        /// <summary>showcasing a simpe action that recieve the files and data sended via a simple POST</summary>
        /// <param name="fileWrapper">a list of files and other metadata</param>
        public void Post(FileWrapper fileWrapper)
        {
            //DO WTE you want ith your files and data
            foreach (var clientFile in fileWrapper.Files)
            {
                File.WriteAllBytes($@"c:\temp\{clientFile.Name}", clientFile.Content);
            }
        }
    }
}
```


now, in your client application - install the corresponding package.

```shell
yarn add aleph1-client-file
```
or
```shell
npm install aleph1-client-file
```
import the library using

```javascript
import "aleph1-client-file";
```
the library introduce a helper function for the File class - that transform it to a `clientFile`.
this operation is not synchronous, and therefor the API return a Promise.

```javascript
sendFiles()
{
    files :FileList = /* get your FileList in your favorite way */;
    const files:File[] = Array.from(files);
    const clientFilesPromises = files.map(f => f.toClientFile()); /* toClientFile is a helper function on the File class*/

    Promise.all(clientFilesPromises)
    .then(clientFiles => {
        //creating the body to match the expected POCO class on the server
        const body = {
            someData: "Hello",
            files: clientFiles
        };
        
        // regular JSON POST
        return httpClient.fetch("???/api/Files",
        {
            method: "POST",
            body: json(body)
        })
    });
}
```


## Developing & Prerequisites

```shell
git clone https://github.com/avrahamcool/aleph1-client-file.git
cd aleph1-client-file/
yarn
```
run `yarn build` or `npm build` to compile the entire project.

## Licensing

The code is open source and available under the [MIT License](LICENSE.md).

Built and maintained by [Essoudry Avraham](https://github.com/avrahamcool)