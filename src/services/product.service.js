export const getProducts = (result) => {
  const handleErrors = (response) => {
    if (!response.ok)
      throw Error(response.statusText);
    return response;
  };

  return fetch('https://js.devexpress.com/Demos/DevAV/odata/Products')
    .then(handleErrors)
    .then(response => response.json())
    .then(d => {
      d.value.forEach(element => {
        result.push({
          'Product_ID': element.Product_ID,
          'Product_Name': element.Product_Name.split('').filter(simbol => /^([a-zA-Z]+)$/.test(simbol)).join(''),
          'Product_Cost': element.Product_Cost,
          'Product_Description': '',
        });
      });
      return result;
    })
    .catch((e) => {
      throw 'Network error';
    });
};