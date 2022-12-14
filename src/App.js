import {
  Box,
  Button,
  Heading,
  ListItem,
  Textarea,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";

import { useState } from "react";

function App() {
  let [product1, setProduct1] = useState("");
  let [product2, setProduct2] = useState("");
  let [commonIngredients, setCommonIngredients] = useState([]);
  let [uncommonIngredients, setUncommonIngredients] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleProductChange = (e) => {
    let inputId = e.target.id;
    if (inputId === "product1") {
      setProduct1(e.target.value);
    } else if (inputId === "product2") {
      setProduct2(e.target.value);
    }
  };

  const compareProducts = () => {
    let product1Array = product1.split(",");
    let product2Array = product2.split(",");

    product1Array = product1Array.map((item) => item.trim());
    product2Array = product2Array.map((item) => item.trim());

    product1Array = product1Array.filter((item) => item !== "");
    product2Array = product2Array.filter((item) => item !== "");

    product1Array = [...new Set(product1Array)];
    product2Array = [...new Set(product2Array)];

    let commonIngredients = product1Array.filter((item) =>
      product2Array.includes(item)
    );
    setCommonIngredients(commonIngredients);

    let uncommonIngredients = product1Array.filter(
      (item) => !product2Array.includes(item)
    );
    uncommonIngredients = uncommonIngredients.concat(
      product2Array.filter((item) => !product1Array.includes(item))
    );
    setUncommonIngredients(uncommonIngredients);
  };

  return (
    //input for list of ingredients
    <Box m={3}>
      <Heading>Compare Ingredients</Heading>
      <Textarea
        resize={"none"}
        type="text"
        value={product1}
        mt={3}
        height="200px"
        id="product1"
        onChange={handleProductChange}
        placeholder="Product #1 Ingredients"
      />
      <Textarea
        resize={"none"}
        type="text"
        height="200px"
        mt={3}
        value={product2}
        id="product2"
        onChange={handleProductChange}
        placeholder="Product #2 Ingredients"
      />
      <Button colorScheme="teal" mt={3} size="md" onClick={compareProducts}>
        Compare
      </Button>
      <Button position="absolute" top={0} right={3} onClick={toggleColorMode}>
        {colorMode === "light" ? "🌙" : "☀"}
      </Button>
      {(commonIngredients.length > 0 || uncommonIngredients.length > 0) && (
        <Box display="flex" mt={3}>
          <Box width="50%">
            <Heading size="md">Common Ingredients</Heading>
            <UnorderedList>
              {commonIngredients.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box width="50%">
            <Heading size="md">Uncommon Ingredients</Heading>
            <UnorderedList>
              {uncommonIngredients.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
