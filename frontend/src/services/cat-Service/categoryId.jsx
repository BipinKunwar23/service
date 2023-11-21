import React,{useEffect} from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetCategoryServiceQuery } from "../../category/categoryApi";
import {setServiceId} from "./catServiceSlice"
function CategoryId() {
  const params=useParams()
  console.log(params);

  const { parent, subparent, child } = useSelector(
    (state) => state.catServiceSlice.selectedOnClick
    );
    const selected =
    Object.keys(child).length != 0
    ? child
    : Object.keys(subparent).length != 0
    ? subparent
    : parent;
    console.log(selected);
    const { data, isLoading } = useGetCategoryServiceQuery(selected?.id);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const selected=useSelector((state)=>state.profile.saveCategory)
  // useEffect(()=>{
  //   console.log(selected);
  //   Object.keys(selected).length===0?navigate('/seller/category',{replace:true}):null;
  // },[selected])

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      services: [],
    },
  });
  const location = useLocation();
  const { errors } = formState;
  const onSubmit = (value) => {
    console.log(value.services);
    dispatch(services(value));
    navigate("/profile/service");
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
if(data.length<=0){
  return(
    <div>
      No services are found
    </div>
  )
}
  return (
    <div className=" grid grid-cols-2 grid-rows-3 auto-rows-min  gap-5    flex-1 ">
      {data.map((service) => (
        <div className="bg-white hover:cursor-pointer hover:scale-105 shadow-lg p-5 " onClick={()=>{
          dispatch(setServiceId(service.id));
          navigate(`/user/service/${service?.name}/setup`)
          
        }}
        key={service.id}
        >
          <h3 className=" text-[1.7em]  font-medium">{service.name}</h3>
          <p className=" line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
            nostrum doloremque recusandae adipisci neque et, magnam rerum
            eveniet at inventore dicta asperiores quisquam laudantium omnis
            fugit doloribus eum optio odio.
          </p>
        </div>
      ))}

    </div>
  );
}

export default CategoryId;