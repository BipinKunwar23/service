import React from "react";
import { useAddOptionMutation } from "../../../../api/admin/optionApi";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AddForm } from "../../../../components/admin/addForm";
const AddServiceOption = ({setAddItem}) => {
  const [addService, { data, isLoading, isError, error }] =
    useAddOptionMutation();
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const submitForm = async (values) => {

    await addService({ values,serviceId })
      .unwrap()
      .then((response) => {
        console.log("response", response);
        if (response) {
          setAddItem(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { register, control, handleSubmit, setValue } = useForm();
 
 
  return (
    <section className="">
      <AddForm register={register} submitForm={submitForm} handleSubmit={handleSubmit} name="Service Option" >
      <div className="flex-1 ">
            <label htmlFor=""> Keywords</label>
            <input type="text" {...register("keywords")} className="w-full" />
          </div>
         </AddForm>
    </section>
  );
};

export default AddServiceOption;
