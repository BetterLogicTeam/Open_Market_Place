import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router";
import SaleModal from "./SaleModal.js";


export default function Collections() {
  const [apiData, setapiData] = useState()
  let myHistory = useHistory();
  
  const Fatch_Api_data = async () => {
    try {

      let res = await axios.get("https://whenftapi.herokuapp.com/sell_marketplace_history?id=100")
      console.log("res", res.data.data);
      res = res.data.data
      console.log("Data",res.name);
      setapiData(res)



    } catch (e) {
      console.log("Error while fatching API ", e);
    }
  }








  useEffect(() => {

    Fatch_Api_data()


  }, []);

  return (


    <div>
       <section
        className="popular-collections-area"
        style={{ marginTop: "15px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <a>
                    <span>On going sale</span>
                  </a>
                  <h3 className="mt-3 mb-0">Live Sale</h3>
                </div>
                <div className="intro-btn">
                  <a href="/explore-3" className="btn content-btn text-left">
                    View All
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 row-10 mt-3 liveauction-card">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* Single Slide */}
                {apiData?.map((item, idx) => {
                    return (
                      <div
                        onClick={() =>
                          this.props.history.push(
                            `/AuctionModal/${idx}`,
                            this.state.data
                          )
                        }
                        style={{ cursor: "pointer", height: "410px" }}
                        key={`auc_${idx}`}
                        className="swiper-slideitem liveauction-card mb-5"
                      >
                        <div
                          style={{ cursor: "pointer", width: "350px" }}
                          className="m-3 card"
                        >
                          <div
                            style={{
                              overflow: "visible",
                              // height: "500px",
                              // width: "350px",
                            }}
                            className="image-over"
                          >
                            <div
                           
                             
                              className="countdown d-flex justify-content-center"
                              data-date={item?.bidEndTime}
                        
                            ></div>
                              <img src="placeholder-image.png" alt="Avatar" className='avatar myCollectionsImage' ></img>

                            {/* <NftView src={this.state.source[idx]} /> */}
                        {/* <NftView src={this.state.source[item.id]} />  */}


                         
                            
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
                                    // data.auctionCreatedAt * 1000
                                  ).toISOString()}
                                </div>
                              </div>
                              <h5 className="mb-0"></h5>
                              <a className="seller d-flex align-items-center my-3">
                                {/* <img  className="avatar-sm rounded-circle" src="" alt="" /> */}
                                <span
                                  style={{ fontSize: "large" }}
                                  className="ml-2 mt-2"
                                >
                                  {/* {data.token.name} */}
                                  {item?.name}
                                </span>
                              </a>
                              <div className="card-bottom d-flex justify-content-between">
                                <span
                                  style={{ width: "50%", fontSize: "small" }}
                                >
                                 Owned by: {item?.owner}
                                
                                </span>
                                <span>
                                  {/* <Timer
                                    idx
                                    
                                  /> */}
                                  {item.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
           
          </div>
        </div>
      </section>


    </div>
  )
}


  