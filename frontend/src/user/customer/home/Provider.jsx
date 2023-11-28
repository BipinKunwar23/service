import React from "react";
import plumber from "../../../images/plumber.jpg";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CardId } from "./CardId";
import { useSelector } from "react-redux";
import { useGetProviderDetailsQuery } from "../../../Api/cardApi";
const Provider = () => {
  const {id,category}=useSelector(state=>state.cardSlice.provider);
  const { data, isLoading, isSuccess } = useGetProviderDetailsQuery(id);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isSuccess) {
    return (
      <div className="  p-20 box-border bg-[rgba(0,0,0,0.5)] text-[1em]">
        <div className="flex gap-5 bg-white p-8 border-b-2 border-gray-300">
          <div>
            <img
              src={plumber}
              className="h-[300px] w-[300px] object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <h2 className="text-center text-[1.4em] font-semibold font-sans">
                  {category.toUpperCase()}
                </h2>
                <div className=" flex place-content-center">
                  {Array(data?.rating)
                    .fill()
                    .map((_, index) => (
                      <i key={index} className=" ">
                        <FaStar className=" text-[#FA130C] text-[1.4em]" />
                      </i>
                    ))}
                </div>
              </div>
              <div className="grid place-content-center  ">
                <ul className=" text-center grid gap-4">
                  <li className=" ">
                    {" "}
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaUser className=" text-blue-600 text-[1.5em]" />
                        </i>
                      </li>
                      <li className=" text-[1.2em] font-medium">
                       {data?.name.toUpperCase()}
                      </li>
                    </ul>
                  </li>

                  <li>
                    <ul className=" flex gap-2 place-content-center">
                      <li className=" grid place-content-center">
                        <i>
                          <FaHome className=" text-blue-600 text-[1.3em]" />
                        </i>
                      </li>
                      <li className=" italic">{`${data?.profile?.address?.chowk}, ${data?.profile?.address?.muncipility}-${data?.profile?.address?.ward}, ${data?.profile?.address?.district}`}</li>

                    </ul>
                  </li>

                  <li className="grid justify-end ">
                    <ul className="flex gap-8 ">
                      <li className=" ">
                        {" "}
                        <ul className=" flex gap-2 place-content-center">
                          <li className=" grid place-content-center">
                            <i>
                              <FaEnvelope className=" text-blue-600 text-[1em]" />
                            </i>
                          </li>
                          <li className=" italic text-[0.9em]">{data.email}</li>

                        </ul>
                      </li>
                      <li className=" ">
                        <ul className=" flex gap-2 place-content-center">
                          <li className=" grid place-content-center">
                            <i>
                              <FaPhoneAlt className=" text-blue-600 text-[1em]" />
                            </i>
                          </li>
                          <li className="text-[0.9em]">
                            {data?.profile?.phone_number}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" flex justify-center">
              <button className="bg-gray-200 p-2 w-[200px]">View More</button>
            </div>
          </div>
          <div className="bg-white p-4 w-[400px] flex flex-col gap-5 ">
            <div className="flex flex-col gap-5">
              <label htmlFor="">Description</label>
              <textarea
                name=""
                id=""
                rows="6"
                className="border-2 border-gray-400 rounded-md"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-600 text-white w-full p-2"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
        <div className="  box-border p-8  bg-white ">
          <p className="text-[1.4em] mb-5 font-semibold align-bottom ">
            My Services
          </p>
          <section className="flex flex-col   gap-5 ">
            {
             data?.services.map((service) => (
                <div
                  key={service?.id}
                  className=" p-10 shadow grid grid-cols-1 border  border-gray-300 box-border"
                >
                  <div className=" flex flex-col gap-2">
                    <p className="font-semibold font-sans text-[1.3em]">
                      {service?.name}
                    </p>
                    <table  className="table-fixed  " cellSpacing={5}  cellPadding={10} >
                  <thead  >
                    <tr className="bg-gray-600 text-white "  >
                      <th>Location</th>
                      <th>Days</th>
                      <th>Time</th>
                      <th>Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-blue-600 text-white">
                      <td className="text-center">{service?.pivot?.location}</td>
                      <td className="text-center ">{
                        service?.pivot?.days.map(day=><span className="mr-2" key={day}>{day}</span>)
                      }</td>
                      <td className="text-center">{`${service?.pivot?.time?.start}-${service?.pivot?.time?.end}`}</td>
                      <td className="text-center">{`${service?.pivot?.charge?.min}-${service?.pivot?.charge?.max}`}</td>
                    </tr>
                  </tbody>
                </table>
                    <div className="flex justify-between">
                      <button className="bg-gray-200 p-2 w-[200px]">
                        View More
                      </button>
                      <button
                      type="button"
                      className="font-bold font-sans text-[1em] bg-green-600 p-2 text-white"
                    >
                      REQUEST NOW
                    </button>
                    </div>
                  </div>
                
                </div>
              ))}
          </section>
        </div>

        <div className="bg-white p-2 flex flex-col gap-2">
          <h2 className="text-[1.2em] font-semibold">Other Services</h2>
          <div className=" ">
            <CardId />
          </div>
        </div>

        {/* footer */}
        <div className="border-t-2 border-gray-400 flex gap-10 bg-white p-10 box-border">
          <div className=" flex-1 border border-gray-300 p-6 ">
            <form action="" className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-[1.2em] font-semibold">
                  Feedback
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  className="border-2 border-gray-300"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-orange-600 text-white p-2 w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="flex-1 grid bg-white place-content-center ">
            <div className="flex flex-col gap-10">
              <h2 className="text-center text-[1.5em] font-semibold text-orange-600">
                Rate Service Provider
              </h2>
              <div className=" flex justify-center gap-2 ">
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <i key={index} className=" ">
                      <FaStar
                        className=" text-[rgba(0,0,0,0.6)] hover:cursor-pointer text-[2em]"
                        onClick={() => {}}
                      />
                    </i>
                  ))}
              </div>
              <div>
                <button
                  type="submit "
                  className="bg-green-600 text-white p-2 w-full"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Provider;
