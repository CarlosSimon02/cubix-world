"use client";

import { useDictionary } from "@/presentation/contexts/DictionaryContext";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Col, Input, theme } from "antd";
import { debounce } from "lodash";
import { useState } from "react";
import useSearch from "../../_hooks/useSearch";

const { useToken } = theme;

const HeaderSearch = () => {
  const { token } = useToken();
  const t = useDictionary();
  const [value, setValue] = useState("");
  const { options } = useSearch(value);

  const styles: Styles = {
    autoComplete: {
      width: "100%",
      maxWidth: "550px",
    },
    inputPrefix: {
      color: token.colorTextPlaceholder,
      marginRight: "4px",
    },
    inputSuffix: {
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: token.colorBgTextHover,
      color: token.colorTextDisabled,
      borderRadius: "4px",
      fontSize: "12px",
    },
  };

  return (
    <Col xs={0} sm={8} md={14}>
      <AutoComplete
        style={styles.autoComplete}
        options={options}
        filterOption={false}
        onSearch={debounce(setValue, 300)}
      >
        <Input
          size="large"
          placeholder={t.search.placeholder}
          suffix={<div style={styles.inputSuffix}>/</div>}
          prefix={<SearchOutlined style={styles.inputPrefix} />}
        />
      </AutoComplete>
    </Col>
  );
};

export default HeaderSearch;
