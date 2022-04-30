import React from "react";
import ProductList from '../../componets/ProductList';
import { TestId } from "../../constant/TestId";

const Store: React.FC<{}> = () => {
  return (
    <div>
      <div data-testid={TestId.containers.stores.id} style={{ display: "none" }}>{TestId.containers.stores.value}</div>
      <ProductList
        title={"Store"}
        loading={true}
        products={[]}
        fetchStatus={{
          status: 400,
          message: ""
        }}
      />
    </div>
  )
}

export default Store;