import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useGetCategoryQuery } from "../../../../api/seller/catalogApi";
import { useGetSubCategoryQuery } from "../../../../api/seller/catalogApi";
import { useGetCatalogQuery } from "../../../../api/seller/catalogApi";
import { useAddQualificationMutation } from "../../../../api/seller/profileApi";
import Loader from "../../../../components/Loader"
import { useDispatch } from "react-redux";
import { setProfileStep } from "../../../../redux/sellerSlice";

const Qualification = () => {
  const { data: catalog, isLoading: isCatalog } = useGetCatalogQuery();

  const [subcategories,setSubcategory]=useState([])

  const dispatch=useDispatch()

  const { register, handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      skills: [],
      experience:{
        level:'',
        year:'',

      },
      education:{
        institute:'',
        faculty:'',
        year:'',

      },
      training:{
        institute:'',
        faculty:'',
        level:'',

      },
      certificate:{
        certificate:'',
        institute:'',
        year:'',

      }
    },
  });
  const [addQualification,{isLoading:isAdding}]=useAddQualificationMutation()




  const experience = [
    {
      value: "Begineer",
      label: "Begineer",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
    },
    {
      value: "Experts",
      label: "Experts",
    },
  ];


  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
  });

  const onSubmit=async(values)=>{
    console.log('profession',values);
    await addQualification(values)
    .unwrap()
    .then((response) => {
      console.log(response);
      dispatch(setProfileStep("availability"))
      // navigate(`${location?.state?.path} `, { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  if ( isAdding || isCatalog) {
    return <Loader/>
  }
  return (
    <section className=" bg-white p-5">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">

      <div className="grid grid-cols-3 gap-8 ">
        <label htmlFor="">Occupations </label>
        <div className="col-span-2">
          <Select
             options={catalog.length>0 && catalog.map((category) => {
              return {
                value: category.id,
                label: category.name,
              };
            })}
         placeholder="Select your occupation"
            onChange={(option) => {
              setValue("occupation", option.value);
              setSubcategory(
                catalog.find((category) => category.id === option.value).subcategories
              );
            }}
            isClearable={true}
            className="border-slate-400 "
          />
        </div>
      </div>
      {
        subcategories.length>0 && <>
      <div className="grid grid-cols-3 gap-8 ">
        <label htmlFor="">Skills</label>
        <div className="col-span-2 flex flex-wrap gap-10">
          {subcategories
            .map((subcategory,index) => {
              return (
                <>
                {
                  subcategory?.services.map((skills)=>{
                    
                    return (
                      <div key={skills.id} className="flex gap-2">
                        <input type="checkbox" {...register(`skills.${index}`)} value={skills.id} />
                        <p>{skills.name}</p>
                      </div>
                    );
    
                  })

                }
                </>
              )

            })}
        </div>
      </div>
      <div className="grid grid-cols-3  gap-8 ">
        <label htmlFor="">Experience </label>
        <div className="grid grid-cols-2 gap-5 col-span-2">
          <input
            type="number"
            placeholder="Experience year  "
            className="p-2 border border-slate-400 "
            {...register('experience.year')}
          />
          <Select
            options={experience}
            placeholder="Experience Level"
            onChange={(option) => {
              setValue('experience.level',option.value)
            }}
          />
        </div>
      </div>
        </>

      }
      <div className="grid grid-cols-3 gap-8 ">
        <label htmlFor="">Education </label>
        <div className="grid grid-cols-2 gap-5 col-span-2">
          <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("education.institute")}
            placeholder="College/Institute"
            className="p-2 border border-slate-400 "
          ></input>
          <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("education.faculty")}
            placeholder="Faculty"
            className="p-2 border border-slate-400 "
          ></input>
              <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("education.year")}
            placeholder="Passed Year"
            className="p-2 border border-slate-400 "
          ></input>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8  ">
        <label htmlFor="">Training </label>
        <div className="grid grid-cols-2 gap-5 col-span-2">
          <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("training.faculty")}
            placeholder="Training/Learning"
            className="p-2 border border-slate-400 "
          ></input>
          <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("training.institute")}
            placeholder="Institute Name"
            className="p-2 border border-slate-400 "
          ></input>
             <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("training.level")}
            placeholder="Level"
            className="p-2 border border-slate-400 "
          ></input>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8  ">
        <label htmlFor="">Certificate </label>
        <div className="grid grid-cols-2 gap-5 col-span-2">
          <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("certificate.certificate")}
            placeholder="Certificate/Reward"
            className="p-2 border border-slate-400 "
          ></input>
            <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("certificate.institute")}
            placeholder="Certified From"
            className="p-2 border  border-slate-400 "
          ></input>
          <input
            name=""
            id=""
            cols="30"
            rows="2"
            {...register("certificate.year")}
            placeholder="Year"
            className="p-2 border border-slate-400 "
          ></input>
        </div>
      </div>
      <div className=" grid grid-cols-3 gap-10 ">
          <button type="submit" className="bg-blue-600 p-2 px-4 rounded-lg text-white col-start-2 mt-5">
           Save and  Continue
          </button>
        </div>
      </form>

    </section>
  );
};

export default Qualification;
