import { Box, Button, Heading, Textarea, useColorMode } from "@chakra-ui/react";

import { useState } from "react";

function App() {
  // state for first product
  let [product1, setProduct1] = useState("");
  // state for second product
  let [product2, setProduct2] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  const handleProductChange = (e) => {
    //get id of input
    let inputId = e.target.id;
    //get value of input
    if (inputId === "product1") {
      setProduct1(e.target.value);
    } else if (inputId === "product2") {
      setProduct2(e.target.value);
    }
  };

  const compareProducts = () => {
    // convert string to array separated by commas
    let product1Array = product1.split(",");
    let product2Array = product2.split(",");
    // remove whitespace from each element
    product1Array = product1Array.map((item) => item.trim());
    product2Array = product2Array.map((item) => item.trim());
    // remove empty strings
    product1Array = product1Array.filter((item) => item !== "");
    product2Array = product2Array.filter((item) => item !== "");
    // remove duplicates
    product1Array = [...new Set(product1Array)];
    product2Array = [...new Set(product2Array)];
    // compare arrays
    let commonIngredients = product1Array.filter((item) =>
      product2Array.includes(item)
    );
    console.log("common:", commonIngredients);
    // uncommon ingredients
    let uncommonIngredients = product1Array.filter(
      (item) => !product2Array.includes(item)
    );
    uncommonIngredients = uncommonIngredients.concat(
      product2Array.filter((item) => !product1Array.includes(item))
    );
    console.log("uncommon:", uncommonIngredients);
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
      <Button mt={3} mx={3} onClick={toggleColorMode}>
        {colorMode === "light" ? "🌙" : "☀"}
      </Button>
    </Box>
  );
}

export default App;
