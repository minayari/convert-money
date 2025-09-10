import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

type Currency = "USD" | "IRR";

interface SelectInputProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

export default function SelectInput({ value, onChange }: SelectInputProps) {
  const handleChange = (event: SelectChangeEvent<Currency>) => {
    onChange(event.target.value as Currency);
  };

  return (
    <FormControl sx={{ width: "13rem" }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="USD">$ USD</MenuItem>
        <MenuItem value="IRR">ريال IRR</MenuItem>
      </Select>
    </FormControl>
  );
}
