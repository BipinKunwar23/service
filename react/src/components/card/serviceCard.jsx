import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProviderId } from "../../redux/buyerSlice";
import { IoIosStar } from "react-icons/io";
import Pagination from "react-js-pagination";
import { setPaginateUrl } from "../../redux/buyerSlice";
import "bootstrap/dist/css/bootstrap.min.css";

function ServiceCard({ cards = [], url }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("cards", cards);
  return (
    <>
      <section className="  flex gap-10  grid-flow-row   p-8   ">
        {cards &&
          cards?.data?.map((card) => {
            return (
              <div
                key={card.id}
                className="    w-[24%]  hover:cursor-pointer  "
                onClick={() => {
                  dispatch(setProviderId(card?.id));
                  navigate(`${url}/${card?.id}/option/${card?.option_id}`);
                }}
              >
                <div className="   mb-2 ">
                  <img
                    src={`http://localhost:8000/${card?.galleries[0]?.image}`}
                    className=" h-[200px] w-full object-cover object-right-top rounded-lg  border border-gray-300 "
                  />

                  <div className="text-[1.3em]  grid content-center gap-2  ">
                    <div className="flex gap-3 mt-3">
                      <img
                        src={`http://localhost:8000/${card?.user?.profile?.photo}`}
                        className=" h-[40px] w-[40px] object-cover object-center rounded-full   "
                      />
                      <div className="grid content-center">
                        <h2 className="font-bold"> {card?.user?.name}</h2>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 font-semibold ">
                        {card?.title}
                      </p>
                    </div>

                    <div className="flex gap-2 mb-2 ">
                      <div className="grid content-center">
                        <IoIosStar className="text-orange-600" />
                      </div>
                      <span className="text-lg text-gray-600"> 5.0</span>
                    </div>
                    <div>
                      <p className=" font-semibold">
                        From <span className="text-gray-600"> Rs 300</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      {cards && cards?.data?.length > 0 && (
        <div className="mt-4 grid place-content-center">
          <Pagination
            totalItemsCount={cards?.total}
            activePage={cards?.current_page}
            itemsCountPerPage={cards?.per_page}
            onChange={(pageNumber) => {
              dispatch(setPaginateUrl(pageNumber));
            }}
            itemClass="page-item"
            linkClass="page-link"
            prevPageText="Previous"
            nextPageText="Next"
            hideFirstLastPages={true}
            hideNavigation={false}
            activeClass="active"
          />
        </div>
      )}
    </>
  );
}

export default ServiceCard;
