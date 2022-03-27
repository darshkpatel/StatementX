import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import type { NextPage } from 'next'
import Link from 'next/link'
import { FieldValues, useForm } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import { getPdfTextFromBlob } from '../util/pdf'

const FileUpload: NextPage = () => {
  const [files, setFiles] = useState([]);
  const [reqError, setReqError] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //File Drop/Upload Callback
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: 'application/pdf',
  })

  function onSubmit(data: FieldValues) {
    const formData = new FormData()
    formData.append('statement', files[0])
    formData.append('password', data.password)
    // fetch('/api/process', { body: formData, method: 'POST' }).catch((err) =>
    //   setReqError(err.message)
    // )
    getPdfTextFromBlob(files[0]).then((text) => {console.log(text)}).catch((err) => {console.log(err)})
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage error={reqError} />
        <div className="z-10 w-full rounded-xl bg-white p-10 sm:max-w-lg">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-indigo-600">
              Upload Statement
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Don't worry, no shady business.{' '}
              <Link href="https://github.com/darshkpatel/StatementX">
                <a className="text-gray-500 hover:underline">
                  It's OpenSource
                </a>
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold tracking-wide text-gray-500">
              Password
            </label>
            <input
              className="rounded-lg border border-gray-300 p-2 text-base focus:border-indigo-600 focus:outline-none"
              type=""
              placeholder="PDF's Password"
              {...register('password')}
            />
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold tracking-wide text-gray-500">
              Attach Document
            </label>
            {errors.statement && (
              <span className="text-sm text-red-500">
                {errors.statement.message}
              </span>
            )}
            <div className="flex w-full items-center justify-center">
              <label
                className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center"
                {...getRootProps()}
              >
                {!files.length && (
                  <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                    <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto">
                      <img
                        className="has-mask h-36 object-center"
                        src="/upload.svg"
                        alt="upload illustration"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{' '}
                      <br /> or <br /> Click to select a file
                    </p>
                  </div>
                )}
                {files &&
                  files.map((file: File) => (
                    <div className="text-xl text-gray-500" key={file.name}>
                      <span className="font-bold">Uploaded: </span>
                      {file.name || 'Unknown Name'}
                    </div>
                  ))}
                <input
                  type="file"
                  className="hidden"
                  {...getInputProps()}
                  {...register('statement', {
                    validate: () =>
                      files.length > 0 ? true : 'Please upload a valid file',
                  })}
                />
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            <span>File type: pdf</span>
          </p>
          <div>
            <div className="mt-12 flex flex-col items-center text-center">
              <span className="relative inline-flex w-full md:w-auto">
                <button
                  onSubmit={onSubmit}
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full border border-transparent bg-indigo-600 px-6 py-2 text-base font-bold leading-6 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 md:w-auto"
                >
                  Process
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default FileUpload
