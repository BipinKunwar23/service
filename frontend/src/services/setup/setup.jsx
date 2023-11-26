import React, { useEffect, useState } from "react";
import Time from "./time";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Charge from "./charge";
import { setServiceId } from "../../redux/catServiceSlice";
import {
  useSetupServicesMutation,
  useGetProviderServiceByIdQuery,
  useEditServicesMutation,
  useGetAllProviderServicesQuery,
  useGetProviderServiceByCategoryQuery,
} from "../../Api/serviceApi";
import { useGetOtherCatserviceQuery } from "../../Api/catServiceApi";
import { useForm, Controller } from "react-hook-form";
export default function SeviceSetup() {
  const dispatch = useDispatch();
  const serviceId = useSelector((state) => state.catServiceSlice.serviceId);
  const providerId = localStorage.getItem("userId");
  const [setupService, { isLoading: isCreating }] = useSetupServicesMutation();
  const [editService, { isLoading: isUpdating }] = useEditServicesMutation();

  const { data: service, isLoading } = useGetProviderServiceByIdQuery({
    serviceId,
    providerId,
  });

  const { parent, subparent, child } = useSelector(
    (state) => state.catServiceSlice.selectedOnClick
  );
  const selected =
    Object.keys(child).length != 0
      ? child
      : Object.keys(subparent).length != 0
      ? subparent
      : parent;

  const { data: others, isLoading: ohterLoading } =
    selected?.name !== "all" && useGetOtherCatserviceQuery(selected?.id);

  

  const navigate = useNavigate();

  const [button, setButton] = useState("");

  const { register, control, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (values) => {
    console.log("vaue", values);
    const userId = localStorage.getItem("userId");

    const formdata = new FormData();
    formdata.append("id", userId);
    formdata.append("cid", values.cid);
    formdata.append("description", values.description);
    formdata.append("time", JSON.stringify(values.time));
    formdata.append("days", JSON.stringify(values.days));
    formdata.append("charge", JSON.stringify(values.charge));
    formdata.append("experience", values.experience);
    formdata.append("offers", values.offers);
    formdata.append("address", values.address);
    formdata.append("image", values.image);
    if (button === "create") {
      await setupService(formdata)
        .unwrap()
        .then((response) => {
          console.log(response);
          reset();
          navigate("/user/service");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (button === "update") {
      await editService(formdata)
        .unwrap()
        .then((response) => {
          console.log(response);
          reset();
          navigate("/user/service");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    Object.keys(selected).length === 0
      ? navigate("/user/service/category")
      : null;
  }, [selected]);
  if (isLoading || isCreating || ohterLoading || isUpdating) {
    return <div>Loading...</div>;
  }
  return (
    <section className="grid grid-cols-1 text-[1em] text-slate-500 box-border bg-[rgba(0,0,0,0.5)] p-14 gap-5 ">
      <div className="flex justify-end">
        <button
          className="w-[200px] text-center bg-blue-600 p-2 text-white"
          onClick={() =>
            navigate(`/user/service/category/`, {
              replace: true,
            })
          }
        >
          Goto Category
        </button>
      </div>
      <div>
        <form
          action=""
          className="   grid grid-cols-2 gap-5 font-medium text-[1em]  bg-white p-10  box-border justify-self-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="service flex flex-col gap-4">
            <div className=" ">
              <span className="text-[1em]]">Service Name</span>
              <p className="flex-1 font-medium text-[1.2em] ">
                {service?.name}
              </p>
              <input
                type="text"
                hidden={true}
                value={service.id}
                {...register("cid")}
              />
            </div>

            <div className=" ">
              <label htmlFor="">Service Description</label>
              <textarea
                cols="50"
                rows="2"
                className="placeholder:text-[1em]  focus:outline-none "
                {...register("description")}
                defaultValue={service?.pivot?.description}
              ></textarea>
            </div>
            <Time
              register={register}
              Controller={Controller}
              control={control}
              setValue={setValue}
              time={service?.pivot?.time}
              days={service?.pivot?.days}
            />

            <Charge
              register={register}
              Controller={Controller}
              control={control}
              setValue={setValue}
              charge={service?.pivot?.charge}
            />
          </div>

          <div className="flex flex-col service gap-4">
            <div className="flex flex-col">
              <label htmlFor="">Service Place</label>
              <input
                type="text"
                {...register("address")}
                defaultValue={service?.pivot?.location}
              />
              {/*             
        <div className="location flex gap-2 flex-col">
        
          <div className="">
            <label htmlFor="">District</label>
            <input type="text" {...register('address.district')} />
          </div>
          <div className="">
            <label htmlFor="">Muncipility</label>
            <input type="text" {...register('address.mun')}/>
          </div>
          <div className="">
            <label htmlFor="">Ward No</label>
            <input type="text" {...register('address.ward')} />
          </div>
          <div className="">
            <label htmlFor="">Tole/Chowk</label>
            <input type="text" {...register('address.chowk')} />
          </div>
        </div> */}
            </div>

            <div className="  flex flex-col">
              <label htmlFor=""> Service Experience</label>
              <textarea
                name=""
                id=""
                cols="50"
                rows="2"
                className="placeholder:text-[1em]   focus:outline-none "
                placeholder="Your work experience"
                {...register("experience")}
                defaultValue={service?.pivot?.expereince}
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Special Offers & Discounts</label>
              <input
                type="text"
                className=" "
                {...register("offers")}
                defaultValue={
                  service?.pivot?.offers || "No offers are available"
                }
              />
            </div>
            <div className="">
              <Controller
                name="image"
                control={control}
                render={({ field }) => {
                  return (
                    <div>
                      <label htmlFor="">Add Images</label>

                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setValue("image", e.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            </div>

            <div className="flex-1 place-content-end">
              {service?.pivot !== null ? (
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white px-10"
                  onClick={() => {
                    setButton("update");
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="submit"
                  className=" p-2 bg-blue-600 text-white px-10"
                  onClick={() => {
                    setButton("create");
                  }}
                >
                  Create Service
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <section className=" flex justify-between p-10 bg-white ">
        {selected?.name != "all" && (
          <div>
            <p className="mb-2 bg-orange-600 p-2 text-white font-medium w-[40vw]">
              Other Services
            </p>

            <ul className="    flex flex-col  text-[0.95em] w-[40Vw]">
              {others
                .filter((item) => item.id != serviceId)
                .map((other, index) => (
                  <li
                    key={other.id}
                    className=" text-gray-100 border-gray-300 p-2 hover:bg-gray-300 hover:cursor-pointer"
                    onClick={() => {
                      dispatch(setServiceId(other?.id));
                      navigate(`/user/service/${other?.name}/setup`, {
                        replace: true,
                      });
                    }}
                  >
                    {other?.name}
                  </li>
                ))}
            </ul>
          </div>
        )}
        <div>
          <div className="flex flex-col">
            <label htmlFor="">Feecback</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Rate Services</label>
            *******
          </div>
        </div>
      </section>
    </section>
  );
}
