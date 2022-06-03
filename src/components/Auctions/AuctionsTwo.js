
import React, { useEffect, useState } from 'react'
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import {  withRouter } from "react-router";
import AuctionModal from "./AuctionModal";
import Web3 from "web3";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
} from "../Utils/Contract";
import { loadWeb3 } from "../../components/Api/api";
import { useParams, useHistory } from "react-router-dom";



export default function AuctionsTwo() {
  let myHistory = useHistory();


  const [ApiData, setApiData] = useState()
  const [modelopen, setmodelopen] = useState(false)

  




  const auction = async () => {
    
    let res = await axios.get(`https://whenftapi.herokuapp.com/OnAuction_marketplace_history?id=100`);
    console.log("ressssssss", res.data.data);
    res=res.data.data;
    
    setApiData(res)
     
    
   
  };

  useEffect(() => {
    auction()
  }, [])
  
  return (
    <div>
      <section className="live-auctions-area load-more">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>Auctions</span>
                <h3 className="mt-3 mb-3">All Auctions</h3>
                

               
                
              </div>
            </div>
          </div>
          <div className="row items">
            {
            ApiData?.map((items, index) => {
         
                return (
                 <>
                  <div className="col-lg-4">
                  
                <div className="swiper-container slider-mid items">
                    <div className="swiper-wrapper"
                                    onClick={() => myHistory.push("/AuctionModal/" + index)}
                     >

                      <div
                    
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
                                 Price: {parseFloat(items.price).toFixed(8)} BNB
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
                );
              })}
          </div>
        
        </div>
      </section>
      


    </div>
  )
}









 

  