"use client";

import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import { debounce } from "lodash";
import { AutoComplete } from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import useSearch from "../../_hooks/useSearch";

const HeaderSearch = () => {
  const t = useDictionary();
  const [value, setValue] = useState("");
  const { options } = useSearch(value);

  return (
    <div className="relative mr-4 hidden flex-1 md:block">
      <AutoComplete
        value={value}
        suggestions={options}
        completeMethod={debounce((e) => setValue(e.query), 300)}
        dropdown
        className="w-full"
      >
        <InputText placeholder={t.search.placeholder} className="w-full pl-8" />
      </AutoComplete>
      <i className="pi pi-search text-color-secondary absolute top-1/2 left-3 -translate-y-1/2 transform" />
    </div>
  );
};

export default HeaderSearch;
