import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SellNFt from "./SellNFt";
import axios from "axios";
// import Spinner from '../'

import "./Sell_style.css";
import { useParams, useHistory } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "../../features/userSlice";
import { loadWeb3 } from "../Api/api";
import { placeholder } from '../Assets/placeholder.webp'

import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
  nftMarketToken_Abi,
} from "../Utils/Contract";
// import { getallNFTs } from "../../reducers/Get_Nfts/grt_nft.reducer";
import { getAllNFT } from "../../reducers/Get_Nfts/getNFT.reducer";
import { wireNftContractAbi, wireNftContractAddress } from "../Utils/wireNft";

export default function Sellmain() {
  const { id } = useParams();
  const Web3Api = useMoralisWeb3Api();
  const dispatch = useDispatch();
  const [nftdata, setnftdata] = useState([]);
  let [tokenid, settoken_id] = useState();
  let [ownadd, setownadd] = useState();
  let [isSpinner, setIsSpinner] = useState(false)
  let [btn, setbtn] = useState(true)
  let [NftName, setNftName] = useState()





  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();

  const fetchNFTs = async () => {
    let acc = await loadWeb3();

    let myDummyArray = [];
    let imageArray = [];
    initialize();
    // Moralis.start()
    const options = {
      chain: "Bsc Testnet",
      address: acc,
    };
    const polygonNFTs = await Web3Api.account.getNFTs(options);

    let res = polygonNFTs.result[id];
    //  res = res[id];
    const web3 = window.web3;
    let nftContractOf = new web3.eth.Contract(
      wireNftContractAbi,
      wireNftContractAddress
    );
    // let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call();
    // console.log("polygon", res);
    // let res_here = await axios.get(
    //   `https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${walletOfOwner[id]}.jpg`
    // );
    // console.log("lengthtayya", res_here.config.url);
    let urlhere
    let loopLength = res.length;
    console.log("check", res);
    let jsonUsrl = res.token_uri;
    // let img_url=res_here.config.url;
    if(jsonUsrl==null){
      jsonUsrl=jsonUsrl
      urlhere="https://images.app.goo.gl/ukHQE5vYXEhxKQiy9"
    }else{
      jsonUsrl=await axios.get(jsonUsrl);

      console.log("jsonUsrl", jsonUsrl.data.image);
       urlhere=jsonUsrl.data.image
    }
   


    let name = res.name;
    let owner_of = res.token_address;
    let token_address = res.token_address;
    let amount = res.amount;
    let symbol = res.symbol;
    let token_id = res.token_id;
    settoken_id(token_id)
    setownadd(owner_of)
    setNftName(name)
    // if (jsonUsrl.startsWith("ipfs")) {
    //   jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://").slice(-1)[0];
    // } else {
    //   jsonUsrl = jsonUsrl
 
    // }

    let finalUrl;
    // = await axios.get(jsonUsrl);
    // finalUrl = finalUrl.data.image;
    console.log("urlhere",urlhere);
    imageArray = [
      ...imageArray,
      {
        url: urlhere,
        name: name,
        owner_of: owner_of,
        token_address: token_address,
        amount: amount,
        symbol: symbol,
        token_id: token_id,
        // img_url:img_url
      },
    ];
    // console.log("Finally Url is ", finalUrl);
    // console.log("count", imageArray);

    setnftdata(imageArray);

    dispatch(incrementByAmount(imageArray));
  };

  useEffect(() => {
    if (isInitialized) {
      console.log("isInitialized", isInitialized);
      fetchNFTs();
    }
  }, [isInitialized]);
  useEffect(() => {
    console.log("isInitialized", isInitialized);
    fetchNFTs();
  }, []);

  // const { isInitialized, authenticate, isAuthenticated, user, initialize } =
  //   useMoralis();
  // const dispatch = useDispatch();

  // const [nftdata, setnftdata] = useState([]);
  // const order_deatails = useSelector((state) => state);
  // //   const value = useSelector((state) => state.user.value)
  // // order_deatails=order_deatails.getnft.order_deatails.result[id]

  // // console.log("check_her_data",order_deatails.getnft);
  // const getNFT = async () => {
  //   let acc = await loadWeb3();

  //   console.log("accout",acc);
  //   const options = {
  //     chain: "Bsc Testnet",
  //     address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
  //   };
  //   const polygonNFTs = await Web3Api.account.getNFTs(options);
  // // order_deatails=order_deatails.getnft.order_deatails.result[id]

  //   dispatch(getAllNFT(polygonNFTs));
  // };
  // useEffect(() => {
  //   getNFT();
  // }, []);



  const inputdata_price = useRef();

  //   const fetchNFTs = async () => {
  //     let acc = await loadWeb3();

  //     let myDummyArray = []
  //     let imageArray = [];
  //     initialize()
  //     // Moralis.start()
  //     const options = {
  //       chain: "Bsc Testnet",
  //       address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
  //     };
  //     const polygonNFTs = await Web3Api.account.getNFTs(options);

  //     let res = polygonNFTs.result[1];
  //     //  res = res[id];

  //     // console.log("lengthtayya", res);
  //     // let loopLength = res.length;
  //     // console.log("Bahir", loopLength);
  //     // let jsonUsrl = res.token_uri
  //     // let name = res.name;
  //     // let owner_of = res.owner_of;
  //     // let token_address = res.token_address;
  //     // let amount = res.amount;
  //     // let symbol = res.symbol;
  //     // let token_id = res.token_id;
  //     // settoken_id(token_id)
  //     // setownadd(token_address)
  //     // console.log("token_id", token_id);
      // // if (jsonUsrl.startsWith("ipfs")) {
      // //   jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
      // // } else {
      // //   jsonUsrl = jsonUsrl
      // // }

  //     // let finalUrl
  //     // // = await axios.get(jsonUsrl);
  //     // // finalUrl = finalUrl.data.image;
  //     // imageArray = [...imageArray, { url: finalUrl, name: name, owner_of: owner_of, token_address: token_address, amount: amount, symbol: symbol, token_id: token_id }]
  //     // console.log("Finally Url is ", finalUrl);
  //     // console.log("count", imageArray);

  //     // setnftdata(imageArray)

  //     dispatch(incrementByAmount(res))

  //   };

  const addOrder = async () => {
    let acc = await loadWeb3();
    console.log("ACC=", acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net")
    } else {


      try {
        // setIsSpinner(true)
        const web3 = window.web3;
        let address = "0x4113ccD05D440f9580d55B2B34C92d6cC82eAB3c"
        let value_price = inputdata_price.current.value;

        if (value_price == "") {
          toast.error("Please Enter the Price")
          // setIsSpinner(false)
        }
        else {

          // setIsSpinner(true)


          if (value_price <= 0) {
            toast.error("Please Enter Price Greater the 0")
            // setIsSpinner(false)

          }
          else {
            // setIsSpinner(true)

            value_price = web3.utils.toWei(value_price)
            let curreny_time = Math.floor(new Date().getTime() / 1000.0)

            console.log("tayyab", curreny_time)


            let nftContractOftoken = new web3.eth.Contract(nftMarketToken_Abi, ownadd);
            let getodernumberhere = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);




            // console.log("getorderhere", getItemId)
            console.log("Own_token_Address", tokenid)
            console.log("ownadd", ownadd)
            console.log("curreny_time", curreny_time)
            console.log("value_price", value_price)




            let getListingPrice = await getodernumberhere.methods.getListingPrice().call();

            console.log("getListingPrice", getListingPrice);

            await nftContractOftoken.methods.setApprovalForAll(nftMarketContractAddress, true).send({
              from: acc,
            })
            // setIsSpinner(false)

            toast.success("Approved Successfuly")
            // setIsSpinner(true)

            let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
            let hash = await nftContractOf.methods.createMarketItem(tokenid, value_price, 1, false, curreny_time, ownadd).send({
              from: acc,
              value: getListingPrice,
              feelimit: 10000000000
            })
            hash = hash.transactionHash
            console.log("hash", hash);
            // setIsSpinner(false)
            toast.success("Transion Compelete")
            let getItemId = await getodernumberhere.methods.tokenIdToItemId(ownadd, tokenid).call();
            let MarketItemId = await getodernumberhere.methods.idToMarketItem(getItemId).call();
            console.log("MarketItemId", MarketItemId)
            let bidEndTime = MarketItemId.bidEndTime;
            let isOnAuction = MarketItemId.isOnAuction;
            let itemId = MarketItemId.itemId;
            let nftContract = MarketItemId.nftContract;
            let owner = MarketItemId.owner;
            let price = MarketItemId.price;
            let seller = MarketItemId.seller;
            let sold = MarketItemId.sold;
            let tokenId = MarketItemId.tokenId;









            let postapiPushdata = await axios.post('https://whenftapi.herokuapp.com/nft_marketplace', {
              "uid": value_price,
              "useraddress": acc,
              "itemId": itemId,
              "nftContract": nftContract,
              "tokenId": tokenId,
              "owner": owner,
              "price": price,
              "sold":sold ,
              "isOnAuction": isOnAuction,
              "bidEndTime": bidEndTime,
              "name": NftName,
              "url": "Image_url",
              "txn": hash
            })

            console.log("postapiPushdata", postapiPushdata);
            toast.success("Success")


          }
        }
      }
      catch (e) {
        console.log("Error while addOrder ", e)
        // setIsSpinner(false)


      }
    }
  }






  return (
    <div>
      {/* {console.log("order_deatails", nftdata)} */}
      <section className="mt-4 item-details-area">
        <div className="container">
          {/* {
      isSpinner ? <Spinner/> : <></>

    } */}

          {

            nftdata?.map((items, index) => {
              return (
                <div className="row justify-content-between">
                  <div className="col-12 col-lg-6">
                    <div className="content mt-5 mt-lg-0">
                      <h3 className="m-0">{items.name}</h3>
                      {/* {this.state.data.description && (
                                           <p>{this.showDescription(this.state.data.description)}</p>
                                        )} */}
                      <p>{items.symbol}</p>

                      <div className="row items">
                        <div className="col-12 item px-lg-2">
                          <div className="card no-hover">
                            <div className="single-seller d-flex align-items-center">

                              <div className="seller-info mt-3">

                                <h5>Price</h5>
                              </div>

                              <input
                                type="text"
                                placeholder="Enter Bid Value in ETH"
                                className="d-block btn btn-bordered-white mt-4 ml-4"
                                id="bid"
                                ref={inputdata_price}
                              />
                            </div>
                          </div>
                        </div>


                        <div className="col-12 item px-lg-2">
                          {/* <div className="card "> */}
                          {/* <select name="days" class="dropdown__filter" id="" style={{ backgroundColor: "rgba(0, 0, 0, .12)" }} >
                                                            <option value="" selected disabled hidden>Select Days</option>
                                                            <option value="1" class="dropdown__select"> 1 Day</option>
                                                            <option value="1"> 3 Days</option>
                                                            <option value="1"> 7 Days</option>
                                                            <option value="1"> 3 Months</option>
                                                            <option value="1"> 6 Months</option>



                                                        </select>
 */}
                          {/* <input type="checkbox" class="dropdown__switch" id="filter-switch" hidden />
                                                    <label for="filter-switch" class="dropdown__options-filter">
                                                        <ul class="dropdown__filter" role="listbox" tabindex="-1">
                                                            <li class="dropdown__filter-selected" aria-selected="true">
                                                                Select Days
                                                            </li>
                                                            <li>
                                                                <ul class="dropdown__select">
                                                                    <li class="dropdown__select-option" role="option">
                                                                        1 Day
                                                                    </li>
                                                                    <li class="dropdown__select-option" role="option">
                                                                        3 Day
                                                                    </li>
                                                                    <li class="dropdown__select-option" role="option">
                                                                        7 Day
                                                                    </li>
                                                                    <li class="dropdown__select-option" role="option">
                                                                        3 Months
                                                                    </li>
                                                                    <li class="dropdown__select-option" role="option">
                                                                        6 Months
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </label> */}




                          {/* </div> */}

                          <button className='btn my-4 form-control btn-lg' style={{ padding: '25px 25px 35px 25px' }} onClick={() => addOrder()} >Compelet Listing</button>



                        </div>

                      </div>
                    </div>

                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="item-info">
                      <div className=" p-4 item-thumb text-center">

                        {/* <img
                                                    style={{ width: "400px",F height: "400px" }}
                                                  src={items.url}
                                                    alt=""
                                                /> */}
                        <img src={items.url} alt="Avatar"
                          style={{ width: "400px", height: "400px" }}


                        />

                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }




        </div>
      </section >

      <Footer />


    </div>
  );
}
