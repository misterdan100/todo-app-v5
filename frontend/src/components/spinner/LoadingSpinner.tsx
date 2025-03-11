import { Spinner } from "./spinner";

export const LoadingSpinner = ({message = 'Loding data...'}: {message?: string}) => {
  return (
    <div className="w-ful text-center">
      <Spinner />
      <p className="mt-4 font-semibold text-gray-500 text-lg">
        {message}
      </p>
    </div>
  );
};
