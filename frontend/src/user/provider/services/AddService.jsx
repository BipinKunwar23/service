import React from "react";
import {useAddCatServicesMutation} from '../../../Api/catServiceApi'
import Form from "../form/Form";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
const AddService = () => {
  const [addService, { data, isLoading, isError,error }] =
    useAddCatServicesMutation();
const selected=useSelector((state)=>state.categorySlice.subcategory);
  const submitForm = async (service) => {
    console.log('services',service);
    await addService({service,id:selected})
      .unwrap()
      .then((response) => {
        reset();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (isLoading) {
    return <Loader/>
  }
  if (isError) {
    return <div>{error}</div>;
  }
  return (
    <Form submitForm={submitForm} name="Service" />

  );
};

export default AddService;
