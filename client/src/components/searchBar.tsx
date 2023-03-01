import { useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Autocomplete, Option } from "chakra-ui-simple-autocomplete";

const options = [
  { value: "gavascript", label: "gavascript" },
  { value: "2445 Guilford dr", label: "2445 Guilford dr" },
];
const SearchBar = () => {
  const [result, setResult] = useState<Option[]>([]);
  return (
    <Box w="100%" p={4}>
      <Autocomplete
        w="100%"
        options={options}
        result={result}
        setResult={(options: Option[]) => {
          setResult(options);
        }}
        placeholder="Search property:"
      />
    </Box>
  );
};
export default SearchBar;
