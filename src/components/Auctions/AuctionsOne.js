import React, { Component, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import "./Auction.css";
import { withRouter } from "react-router";
import AuctionModal from "./AuctionModal";
import { nftMarketContractAddress, nftMarketContractAddress_Abi } from "../Utils/Contract";
import { loadWeb3 } from "../Api/api";

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  btnText: "View All",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    date: "2021-12-09",
    title: "Virtual Worlds",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@Richard",
    price: "1.5 BNB",
    count: "1 of 1",
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    date: "2021-10-05",
    title: "Collectibles",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@JohnDeo",
    price: "2.7 BNB",
    count: "1 of 1",
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    date: "2021-09-15",
    title: "Arts",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@MKHblots",
    price: "2.3 BNB",
    count: "1 of 1",
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    date: "2021-12-29",
    title: "Robotic Arts",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@RioArham",
    price: "1.8 BNB",
    count: "1 of 1",
  },
  {
    id: "5",
    img: "/img/auction_5.jpg",
    date: "2022-01-24",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Photography",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@Junaid",
    price: "3.5 BNB",
    count: "1 of 1",
  },
];

const Timer = ({ start}) => {
  // const [time, setTime] = useState(start + duration - Date.now());
  
  const auction = async () => {
    const web3 = window.web3;
    let acc = loadWeb3()


 
    let res = await axios.get(
      `https://whenftapi.herokuapp.com/OnAuction_marketplace_history?id=100`
    );

             
  

let     alldata_here = res.data.data[start]
    alldata_here = alldata_here.itemId;
    let base_price = res.data.data[start]
    base_price = base_price.price
    let bidEndTime = res.data.data[start]
    bidEndTime = bidEndTime.bidEndTime   
    let nftContract = res.data.data[start]
    nftContract = nftContract.nftContract
   
    // setbase_price(base_price)
    // settokenId(alldata_here)
    // setnftcontactadd(nftContract)


    var currentDateTime = new Date();
    let resultInSeconds = currentDateTime.getTime() / 1000;
    let Time_here =bidEndTime-resultInSeconds 
    let TimeFinal = parseInt(Time_here)





    if (TimeFinal <= 0) {
   
      return <div>Ended</div>;
      // setboluher(false)
    } else {
      let days = parseInt(TimeFinal/86400)
     
      // setDays_here(days)
      TimeFinal = TimeFinal % (86400)
      let hours = parseInt(TimeFinal / 3600)
      // setHours_here(hours)
      TimeFinal %= 3600
      let munites = parseInt(TimeFinal / 60)
      // setMunits_here(munites)
      TimeFinal %= 60
      let second_here = parseInt(TimeFinal)
      // setSeconds(second_here)
      
    return  second_here;
     
    }

   

   
  };

  useEffect(() => {
    const timer = setInterval(() => {
      auction()
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const showTime = (curr) => {
    // let t = parseInt(curr / 1000);
    // const sec = t % 60;
    // t = parseInt(t / 60);
    // const min = t % 60;
    // t = parseInt(t / 60);

    // let timer = "";
    // if (t > 0) timer += t + "H ";
    // if (min > 0) timer += min + "M ";
    // timer += sec + "S";

    return ;
  };

  // if (time > 0) return <div>{showTime(time)}</div>;
  // return <div>Ended</div>;
};
const NftView = ({ src }) => {
  const [img, setImg] = useState(true);
  const loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      setImg(false);
    };
    img.src = src;
  };
  useEffect(() => {
    loadMedia(src);
  }, []);

  return (
    <img
      style={{ height: "200px", width: "300px" }}
      className="card-img-top"
      src={src}
      alt=""
    />
  );
};
class AuctionsOne extends Component {
  _isMounted = 1;

  
  state = {
    initData: {},
    data: [],
    liveAuctions: [],
    source: [],
    isOpen: false,
    currentLoad: 0,
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  fetchNFTs = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;



    console.log("web3", web3);

    let getItems = new web3.eth.Contract(
      nftMarketContractAddress_Abi,
      nftMarketContractAddress
    );
    let nftContractInstance = new web3.eth.Contract(
      nftMarketContractAddress_Abi,
      nftMarketContractAddress
    );

    const getAll = await getItems.methods.idToMarketItem(2).call();
    console.log("getAll", getAll);
  };
  fetchImageObject = async () => {
    try {
      let resp;
      if (this._isMounted === 1) {
        this.state.liveAuctions.forEach((nft) =>
          axios
            .get(`https://gateway.pinata.cloud/ipfs/${nft.token.uri}`)
            .then((resp) =>
              this.setState({
                source: {
                  ...this.state.source,
                  [nft.id]: `https://ipfs.io/ipfs/${resp.data.url}`,
                },
              })
            )
        );
      }

      if (this._isMounted === 1) {
        this.setState(() => ({
          isLoaded: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getLiveAuction = gql`
    {
      auctions(where: { status: OPEN }) {
        id
        status
        owner
        token {
          id
        }
        reservePrice
        auctionCreatedAt
        auctionEndedAt
        txnHash
        firstBidTime
        duration
        lastBid {
          bid
          bidder
        }
        bids {
          bidder
          bid
          timestamp
          status
        }
      }
    }
  `;
  getLiveAuction = async () => {
    const query = `
    {
      auctions (where:{status:OPEN}){
        id
        token {
          id
          uri
          name
          description
        }
        reservePrice
        owner
        firstBidTime
        duration
        lastBid {
          id
          bidder
          bid
          status
        }
        bids {
          id
          bidder
          bid
        }
        auctionCreatedAt
        auctionEndedAt
        txnHash
      }
    }
  `;
    try {
      const response = await axios.post(
        "https://whenftapi.herokuapp.com/OnAuction_marketplace_history?id=100",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(
          {
            isLoaded: true,
            liveAuctions: response.data.data.auctions,
            currentLoad:
              response.data.data.auctions.length > 8
                ? 8
                : response.data.data.auctions.length,
          },
          () => {
            this.fetchImageObject();
          }
        );
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };
  handleLoadMore = () => {
    if (this.state.currentLoad < this.state.liveAuctions.length) {
      if (this.state.currentLoad + 4 <= this.state.liveAuctions.length) {
        this.setState({ currentLoad: this.state.currentLoad + 4 });
      } else {
        this.setState({ currentLoad: this.state.liveAuctions.length });
      }
    } else {
    }
  };
  auction = async () => {
    const res = await axios.get(
      `https://whenftapi.herokuapp.com/OnAuction_marketplace_history?id=100`
    );
    console.log("liveress", res);
    this.setState({
      liveAuctions: res.data.data,
      currentLoad: res.data.data.length > 8 ? 8 : res.data.data.length,
    });
    return res;
  };
  componentDidMount() {
    this._isMounted = 1;

    this.setState({
      initData: initData,
      data: data,
    });
    // this.fetchImageObject();
this.auction()
    // this.getLiveAuction();
  }
  componentWillUnmount() {
    this._isMounted = 0;
  }
  render() {
    var { liveAuctions } = this.state;
    var date = new Date(1627282552 * 1000);
    var auctionDate = date.toISOString();
    const { currentLoad } = this.state;
    const handleOpenModel = () => {
      this.setState({ isOpen: true });
    };

    return (
      <section style={{ height: "850px" }} className="live-auctions-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{this.state.initData.pre_heading}</span>
                  <a>
                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                  </a>
                </div>
                <div className="intro-btn">
                  <a href="/auctions" className="btn content-btn">
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 row-10 mt-3 liveauction-card">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* Single Slide */}
                {liveAuctions && liveAuctions.slice(0, currentLoad).map((item, idx) => {
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
                            {/* <NftView src={this.state.source[idx]} /> */}
                        {/* <NftView src={this.state.source[item.id]} />  */}
                        <img src="placeholder-image.png" alt="" />


                         
                            
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
                                  Created at:{item.edate}
                                  {/* {new Date(
                                    
                                  ).toISOString()} */}
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
                                  {item?.tokenId}
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
      </section>
    );
  }
}

export default withRouter(AuctionsOne);
