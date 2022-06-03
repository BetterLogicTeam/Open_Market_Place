import React, { useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import Web3 from 'web3'
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
  ESCROW_CONTRACT_ADDRESS
} from '../../config'
import { nftMarketContractAddress, nftMarketContractAddress_Abi } from '../Utils/Contract'
import { loadWeb3 } from '../Api/api'
import axios from 'axios'
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import Footer from '../Footer/Footer'




export default function AuctionModal() {
  const { id } = useParams();

  const [tokenId, settokenId] = useState()
  const [price, setprice] = useState()
  const [duration, setduration] = useState()
  const [nftcontactadd, setnftcontactadd] = useState()


  const [hightbid, sethightbid] = useState()

  const [base_price, setbase_price] = useState()
  const [bidEndTime, setbidEndTime] = useState()
  const [Seconds, setSeconds] = useState(0)
  const [Days_here, setDays_here] = useState( 0)
  const [Hours_here, setHours_here] = useState(0)
  const [Munits_here, setMunits_here] = useState(0)
  const [img_url, setimg_url] = useState()
  const [setdisable, setsetdisable] = useState()
  const [getinputdata, setgetinputdata] = useState()
  const [boluher, setboluher] = useState(true)





let alldata_here

  const auction = async () => {
    const web3 = window.web3;
    let acc = loadWeb3()


    console.log("dta", id)
    let res = await axios.get(
      `https://whenftapi.herokuapp.com/OnAuction_marketplace_history?id=100`
    );


    console.log("tayyabjerejj", res.data.data[id]);
     alldata_here = res.data.data[id]
    alldata_here = alldata_here.itemId;
    let base_price = res.data.data[id]
    base_price = base_price.price
    let bidEndTime = res.data.data[id]
    bidEndTime = bidEndTime.bidEndTime   
    let nftContract = res.data.data[id]
    nftContract = nftContract.nftContract
    setbase_price(base_price)
    settokenId(alldata_here)
    setnftcontactadd(nftContract)


    var currentDateTime = new Date();
    let resultInSeconds = currentDateTime.getTime() / 1000;
    let Time_here =bidEndTime-resultInSeconds 
    let TimeFinal = parseInt(Time_here)

    //  console.log("TimeFinal",TimeFinal);
   
    // let { Days_here } = this.state
    // let { Hours_here } = this.state
    // let { Munits_here } = this.state

    // let { Seconds } = this.state
    // let { setdisable } = this.state



    if (TimeFinal <= 0) {
   

      setboluher(false)
    } else {
      let days = parseInt(TimeFinal/86400)
     
      setDays_here(days)
      TimeFinal = TimeFinal % (86400)
      let hours = parseInt(TimeFinal / 3600)
      setHours_here(hours)
      TimeFinal %= 3600
      let munites = parseInt(TimeFinal / 60)
      setMunits_here(munites)
      TimeFinal %= 60
      let second_here = parseInt(TimeFinal)
      setSeconds(second_here)
     
    }

    console.log("Days_here", alldata_here);
    try{
      let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
      console.log("tokenId",alldata_here);
      let hightbid = await nftContractOf.methods.highestBidderMapping(79).call();
      console.log("hightbid",hightbid.amount);
      hightbid=hightbid.amount;
      sethightbid(hightbid)

    }catch(e){
      console.log("Error While HeightestBid",e);
    }


   
  };

  const heightestbid=async()=>{
    const web3 = window.web3;

   
  }

  const createBidOnItem = async () => {
    try {
      const web3 = window.web3;
      getinputdata = web3.utils.toWei(getinputdata)
      if (hightbid && base_price > getinputdata) {
        

        let acc = await loadWeb3();
    

     

        let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);

        await nftContractOf.methods.createBidOnItem(tokenId, nftcontactadd).send({
          from: acc,
          value: getinputdata

        })
        toast.success("Biding Successful")
      } else {
        toast.error("Bid price must be greater than base price and highest bid")
      }

    }
    catch (e) {
      console.log("Create Bid Error", e);
    }
  }
  
  useEffect(() => {

    auction()
    heightestbid()
  }, [])


  return (
    <div>

      <section className="mt-4 item-details-area">
        <div className="container">



          <div className="row justify-content-between">
            <div className="col-12 col-lg-6">
              <div className="content mt-5 mt-lg-0">
             
                <div className="row items">
                  <div className="col-12 item  p-2">
                   
                   
                    <div className="card no-hover px-5 ">
                      <div className="single-seller ">
                        <div className="seller-info mt-3">

                        
                          <div className='timer_here'>
                            <p > Highest Bid:{hightbid}</p>
                            {
                              boluher ? (<>
                            <p className='mt-n1'>CLAIM IN {Days_here} <small>d </small>{Hours_here} <small>h</small> {Munits_here} <small>m</small> {Seconds} <small>s</small></p>

                              </>):
                              (
                                <>
                              <span>End Time</span>
                                
                                </>
                              )
                            }
                          

                          </div>

                        </div>
                       
                      </div>

                      {
                         boluher ? (

                          <>
                           <input
                          type="text"
                          placeholder="Enter Bid Value in ETH"
                          className="d-block btn btn-bordered-white mt-4 "
                          id="bid"
                          onChange={(e) => setgetinputdata(e.target.value)}
                         

                        />
                      <button className='btn my-4 form-control btn-lg' style={{ padding: '25px 25px 35px 25px' }}
                      onClick={() => createBidOnItem()} 
                      >
                      Make Offer</button>
                          
                          </>
                         ):(<>
                    <button className='btn mt-2' disabled={setdisable}>Claim on Bid</button>
                         
                         </>)

                      }
                     
                    </div>
                  </div>


                  <div className="col-12 item px-lg-2">
                  </div>

                </div>
              </div>

            </div>
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <div className=" p-4 item-thumb text-center">


                  {/* <img src="placeholder-image.png" alt="Avatar"
                    style={{ width: "400px", height: "400px" }}


                  /> */}

                </div>
              </div>
            </div>
          </div>






        </div>
      </section >

      <Footer />
    </div >
  )
}




