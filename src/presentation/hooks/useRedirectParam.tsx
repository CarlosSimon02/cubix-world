import { useSearchParams } from "next/navigation";

const useRedirectParam = (): string | null => {
  const params = useSearchParams();

  return params?.get("redirect") ?? null;
};

export default useRedirectParam;
