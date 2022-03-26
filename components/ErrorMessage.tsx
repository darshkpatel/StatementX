type ErrorMessageProps = {
  error: string|undefined
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <>
      {error && (
        <div className="rounded-md bg-red-500 p-4 text-white m-2">
          <span className="font-bold">Error: </span>
          {error}
        </div>
      )}
    </>
  )
}

export default ErrorMessage
