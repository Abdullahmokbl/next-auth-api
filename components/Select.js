import { useState } from "react";

export default function Select({ options }) {
  const [select, setSelect] = useState("");
  return (
    <select
      name="category"
      value={select}
      // defaultValue={{ label: "dd", value: 0 }}
      onChange={(e) => {
        setSelect(e.target.value);
      }}
      required
    >
      <option value="" disabled>
        --Please choose an option--
      </option>
      {options.map((i) => {
        return (
          <option key={i} value={i}>
            {i}
          </option>
        );
      })}
    </select>
  );
}
