import { FilterButtons } from "../filters/FilterButtons";

export const HeaderPage = ({title, filters = true}: {title: string, filters?: boolean}) => {
  return (
    <div className="flex flex-col items-center justify-between sm:flex-row gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      { filters && <FilterButtons />}
    </div>
  );
};
