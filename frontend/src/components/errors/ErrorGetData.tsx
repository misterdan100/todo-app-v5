
export const ErrorGetData = ({ message }: {message?: string}) => {

    const errorMessage = message ?? 'Error getting data, please refresh the page.'
  
  
  
  return (
    <div className="text-red-500 font-bold mt-6 text-center w-full">{errorMessage}</div>
  )
}