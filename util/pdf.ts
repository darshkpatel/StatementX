
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/web/pdf_find_controller';
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;


export const getPdfTextFromBlob = async (blob: File, password:string):Promise<string[]> => {
    const dataURI = await blobToDataURL(blob);
    const binary = await convertDataURIToBinary(dataURI);
    return await getPdfText(binary, password);
}

const blobToDataURL = (blob:Blob):Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
        const reader = new FileReader()
        // @ts-expect-error - we know it's a string
        reader.onloadend = () => resolve(reader.result?.toString())
        reader.readAsDataURL(blob)
        } catch (error) {
            reject(error.message);    
        }
    })
  }


  
const convertDataURIToBinary = (dataURI: string): Uint8Array => {
      const BASE64_MARKER = ';base64,';
      const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length
      const base64 = dataURI.substring(base64Index)
      const raw = window.atob(base64)
      const rawLength = raw.length
      const array = new Uint8Array(new ArrayBuffer(rawLength))
      for (let i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i)
      }
      return array
  }


  function getPageText(pageNum: number, PDFDocumentInstance:PDFDocumentProxy):Promise<string> {
      // Return a Promise that is resolved once the text of the page is retrieven
      return new Promise(function (resolve, reject) {
          PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
              // The main trick to obtain the text of the PDF page, use the getTextContent method
              pdfPage.getTextContent().then(function (textContent) {
                  var textItems = textContent.items;
                  var finalString = "";
                  // concat the string of the item to the final string
                  for (var i = 0; i < textItems.length; i++) {
                      var item = textItems[i];

                      // @ts-expect-error - we know it's TextItem
                      finalString += item.str + " ";
                  }
                  resolve(finalString);
              });
          }).catch((error)=>{reject(error.message)});
      });
  }

  function getPdfText(pdfAsArray: Uint8Array, password:string):Promise<string[]> {
    return new Promise((resolve,reject) => {
        console.log(password)
    pdfjsLib.getDocument({data:pdfAsArray, password}).promise.then(function (pdf) {

          var pdfDocument = pdf;
          // Create an array that will contain our promises
          var pagesPromises = [];

          for (var i = 0; i < pdf._pdfInfo.numPages; i++) {
              // Required to prevent that i is always the total of pages
              (function (pageNumber) {
                  // Store the promise of getPageText that returns the text of a page
                  pagesPromises.push(getPageText(pageNumber, pdfDocument));
              })(i + 1);
          }

          // Execute all the promises
          Promise.all(pagesPromises).then(function (pagesText) {

            // return text from all the pages
            resolve(pagesText);

          });

      }, function (reason) {
          // PDF loading error
          console.error(reason);
          reject(reason);
      });
    })
  }
