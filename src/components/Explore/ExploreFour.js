import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { loadWeb3 } from '../Api/api';
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { faker } from '@faker-js/faker'
import { toast } from 'react-toastify';
import { nftMarketContractAddress_Abi, nftMarketContractAddress, nftMarketToken_Abi } from '../Utils/Contract'
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '../../themes/counterSlice'
// import { pending, pendingoder } from "../../themes/pendingOrder";
import { useParams, useHistory } from "react-router-dom";
import { pendingOrder } from "../../reducers/nft.reducer/nft.reducer";
import axios from "axios";








export default function ExploreFour() {
  let [orderdata, setorderdata] = useState()
  const [apiData, setapiData] = useState()




  const { isInitialized, authenticate, isAuthenticated, user, initialize } = useMoralis()
  const { nft_details } = useSelector((state) => state.nft)
  let id = 1006;
  let myHistory = useHistory();
  const dispatch = useDispatch();

  const Fatch_Api_data = async () => {
    try {

      let res = await axios.get("https://whenftapi.herokuapp.com/sell_marketplace_history?id=100")
      console.log("res", res.data.data);
      res = res.data.data
      setapiData(res)



    } catch (e) {
      console.log("Error while fatching API ", e);
    }
  }








  useEffect(() => {

    Fatch_Api_data()
    dispatch(pendingOrder(id));

  }, []);



  return (
    <section className="explore-area load-more">
      <div className="container">
        <div className=" justify-content-center">
          <div className="  ">

            <div className="intro text-center">
              <span>Explore</span>
              <h3 className="mt-3 mb-0">Exclusive Digital Assets</h3>
            </div>
          </div>
        </div>
        <div className=" row mt-3 liveauction-card">
          {
            apiData?.map((items, index) => {
              return (
                <>
                <div className="col-lg-4">
                <div className="swiper-container slider-mid items">
                    <div className="swiper-wrapper"
                      onClick={() =>
                        myHistory.push("/purchase/"+index)
                      }>

                      <div
                        // onClick={() =>
                        //   this.props.history.push(
                        //     `/details/${data.token.id}`,
                        //     this.state.data
                        //   )
                        // }
                        // style={{ cursor: "pointer", height: "410px" }}
                        // key={`auc_${idx}`}
                        className="swiper-slideitem liveauction-card"
                      >
                        <div
                          style={{ cursor: "pointer", width: "350px" }}
                          className="m-3 card"
                        >
                          <div
                            style={{
                              overflow: "visible",
                              // height: "250px",
                              // width: "350px",
                            }}
                            className="image-over"
                          >
                            <div
                              style={{
                                // backgroundImage: `url(${
                                //   this.state.source[data.token.id]
                                // })`,
                                height: "250px",
                                width: "100%",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            >

                              <img src="placeholder-image.png" alt="Avatar" className='avatar myCollectionsImage' ></img>

                            </div>
                            {/* <NftView src={this.state.source[idx]} /> */}

                            {/* <video
                              autoPlay
                              loop
                              muted
                              className="card-img-top"
                              src={this.state.source}
                              alt=""
                            ></video> */}
                          </div>
                          {/* Card Caption */}
                          <div className="card-caption col-12 p-0">
                            {/* Card Body */}
                            <div className="card-body">
                              <div className="countdown-times mb-3">
                                <div
                                  style={{ fontSize: "small" }}
                                  className="countdown d-flex justify-content-center"
                                >
                                  Created at:
                                  {new Date(

                                  ).toISOString()}
                                </div>
                              </div>
                              <h5 className="mb-0"></h5>
                              <a className="seller d-flex align-items-center my-3">
                                {/* <img  className="avatar-sm rounded-circle" src="" alt="" /> */}
                                <span
                                  style={{ fontSize: "large" }}
                                  className="ml-2 mt-2">
                                  {items.name}
                                </span>
                              </a>
                              <div className="card-bottom d-flex justify-content-between">
                                <span
                                  style={{ width: "50%", fontSize: "small" }}
                                >
                                  Owned by:{items.owner}
                                  {/* {orderdata.buyer} */}
                                </span>
                                <span>
                                  {/* <Timer
                                    start={data.auctionCreatedAt * 1000}
                                    duration={data.duration * 60 * 60 * 1000}
                                  /> */}
                                 Price: {items.price} BNB
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="swiper-pagination" />
                  </div>

                </div>
                 




                </>
              )
            })
          }

        </div>

      </div>
    </section>
  );

}


