import React from 'react'
import SubCategory from "./subcategory"
import { useSelector } from 'react-redux'

import ServiceCard from './serviceCard'
const cardSection = ({subcategories,cards}) => {
const selected=useSelector((state)=>state.categorySlice.subcategory);
console.log('cardsection',selected);
  return (

    <section className="service-section grid grid-cols-4   gap-1">
    {/* Sub category section  */}

    <SubCategory subcategories={subcategories}  />


    {/* Provider-Card Section */}
    <section className=" col-start-2   gap-1 box-border  col-span-4 row-start-1 flex-1 z-auto overflow-y-auto hide-scrollbar scrolling-touch   ">
      {/* {
        Object.keys(selected).length===0 ? <AllSevice /> : <ServiceById/>
      } */}
      <ServiceCard cards={cards}/>
    </section>


  </section>
  )
}

export default cardSection