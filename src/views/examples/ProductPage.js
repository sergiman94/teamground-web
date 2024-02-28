import React from "react";

// Core Components
import DemoFooter from "components/footers/DemoFooter.js";
import HeaderProductPage from "components/headers/HeaderProductPage.js";
import Item from "components/product-page/Item.js";
import axios from "axios";

function ProductPage() {
  
  const [field, setField] = React.useState({})

  React.useEffect(() => {
    document.body.classList.add("product-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("product-page");
    };
  });

  const loadData = async () => { 
    let location = window.location.toString()
    let locationQuery = location.split('?')[1] ? location.split('?')[1] : null
    let data = (await axios.get(`https://teamground.herokuapp.com/v1/fields/${locationQuery}`)).data.data
    setField(data)
  }

  React.useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <div className="wrapper">
        <HeaderProductPage field={field}/>
        {/* {Object.keys(field).length > 0 ? <Item field={field}/> : <></>} */}
        <Item field={field}/>
        <DemoFooter/>
      </div>
    </>
  );
}

export default ProductPage;
