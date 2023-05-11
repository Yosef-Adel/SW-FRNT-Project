import React from "react";
import { useState, useEffect } from "react";
import AddPromocodeForm from "../tickestPromocodes/addPromoCodeForm/AddPromocodeForm";
import PromoCodesList from "../tickestPromocodes/promocodesListView/PromoCodesList";

export default function Promocodes() {
    const [dummydata, setdummydata] = useState(true);
    const [promolist, setpromolist] = useState([]);
  return (
    <div>
      <AddPromocodeForm setdummydata={setdummydata} dummydata={dummydata} />
      <PromoCodesList dummydata={dummydata}  />
    </div>
  );
}
