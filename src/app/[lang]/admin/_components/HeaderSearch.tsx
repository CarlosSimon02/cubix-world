"use client";

import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Group,
  Text,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { debounce } from "lodash";
import { useState } from "react";
import useSearch, { RenderItemData } from "../_hooks/useSearch";

const findItemById = (
  items: RenderItemData[],
  id: string
): RenderItemData | undefined => {
  return items.find((item) => item.id === id);
};

const HeaderSearch = () => {
  const { dictionary: t } = useDictionary();
  const [value, setValue] = useState("");
  const { autocompleteData, renderItemData } = useSearch(value);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => {
    const item = findItemById(renderItemData, option.value);
    return (
      <Group gap="sm">
        {item?.image && <Avatar src={item.image} size={36} radius="xl" />}
        <div>
          <Text size="sm">{item?.title}</Text>
          {item?.subtitle && (
            <Text size="xs" opacity={0.5}>
              {item?.subtitle}
            </Text>
          )}
        </div>
      </Group>
    );
  };

  return (
    <Autocomplete
      className="mr-4 hidden w-72 flex-1 sm:block"
      renderOption={renderAutocompleteOption}
      placeholder={t.search.placeholder}
      onChange={debounce(setValue, 300)}
      leftSection={<IconSearch size={16} />}
      data={autocompleteData}
    />
  );
};

export default HeaderSearch;
