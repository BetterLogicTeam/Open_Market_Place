import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap-buttons'
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

const handleCreateAuction = async () => {
  let id = window.location.pathname
  id = id.split('/')[2]
  id = Web3.utils.hexToNumber(id)
  let address
  if (typeof window.ethereum != 'undefined') {
    const web3 = new Web3(window.ethereum)
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    address = accounts[0]
    console.log('address', address)
    let price = document.getElementById('price').value
    price = web3.utils.toWei(price, 'ether')
    const duration = document.getElementById('duration').value

    const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

    await nftContract.methods
      .approve(`${ESCROW_CONTRACT_ADDRESS}`, id)
      .send({
        from: address
        // to: CONTRACT_ADDRESS,
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaction Confirmed')
      })
      .on('error', async function () {
        console.log('Error Encountered')
      })

    // const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    )
    await escrowContract.methods
      .createAuction(id, duration, price)
      .send({
        from: address
        // gas: 23000
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaction Confirmed')
      })
      .on('error', async function () {
        console.log('Error Encountered')
      })
  } else {
    alert(
      "Please Install MetaMask: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'"
    )
  }
}

export default class AuctionModal extends Component {
  state = { tokenId: '', price: '', duration: '',hightbid:"",base_price:"",
  bidEndTime:"",Seconds:"",Days_here:"",Hours_here:"",Munits_here:"",img_url:"",setdisable:"true"}
 

  handleChange = e => this.setState({ tokenId: e.target.value })
  handleChange2 = e => this.setState({ price: e.target.value })
  handleChange3 = e => this.setState({ duration: e.target.value })

  auction = async () => {
    const web3 = window.web3;
    let acc =loadWeb3()


    let  a=this.props.id;
    a=a.idx
    console.log("dta",a)
    const res = await axios.get(
      `https://wire-nft.herokuapp.com/get_auctions_list`
    );

  
    console.log("tayyabjerejj",res.data.data[a]  );
    let alldata_here=res.data.data[a]
    alldata_here=alldata_here.itemId;
    let base_price=res.data.data[a]
    base_price=base_price.price
    let bidEndTime=res.data.data[a]
    bidEndTime=bidEndTime.bidEndTime


    var currentDateTime = new Date();
    let resultInSeconds = currentDateTime.getTime() / 1000;
    let Time_here =resultInSeconds- 1652679863
   let TimeFinal = parseInt( 3-Time_here)
  
  //  console.log("Time_here",resultInSeconds);
 let {Days_here}=this.state
 let {Hours_here}=this.state
 let {Munits_here}=this.state

 let {Seconds}=this.state
 let {setdisable}=this.state



if(TimeFinal<=0){
  console.log("Time_here",resultInSeconds);

  this.setState({
   Days_here:Days_here=0,
   Hours_here:Hours_here=0,
   Munits_here:Munits_here=0,
   Seconds:Seconds=0,
   setdisable:setdisable="false"
  })


  console.log("setdisable",setdisable);



}else{
  Days_here = parseInt(TimeFinal / 86400)
  TimeFinal = TimeFinal % (86400)
   Hours_here = parseInt(TimeFinal / 3600)
  TimeFinal %= 3600
   Munits_here = parseInt(TimeFinal / 60)
  TimeFinal %= 60
   Seconds = parseInt(TimeFinal)
  //  this.state({
  //  setdisable:setdisable="true"

  //  })
 
}
    

console.log("Days_here",Munits_here);
let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);

let hightbid= await nftContractOf.methods.highestBidderMapping(alldata_here).call(); 
this.setState({
  liveAuctions: res.data.data[a],
  currentLoad: res.data.data.length > 8 ? 8 : res.data.data.length,
  hightbid:hightbid,
  base_price:base_price,
  bidEndTime:bidEndTime,
  Days_here:Days_here,
  Hours_here:Hours_here,
  Munits_here:Munits_here,
  Seconds:Seconds

});
   
    return res;
  };

  componentDidMount() {
    this._isMounted = 1;
    // this.setState({
    //   initData: initData,
    //   data: data,
    // });

    // this.fetchNFTs();
    // this.getLiveAuction();
    this.auction();
  }

  render() {
    // console.log("hightbid",this.state.setdisable)
    let { hightbid } = this.state;
    let {base_price}=this.state;
    let {bidEndTime}=this.state;
    let {Days_here}=this.state
    let {Hours_here}=this.state

    let {Munits_here}=this.state

    let {Seconds}=this.state
    let {setdisable}=this.state

   






    const createBidOnItem = async () => {
      try{
        const web3 = window.web3;
        console.log("liveAuctionsliveAuctions",bidEndTime)

        let price=this.state.price
        price=web3.utils.toWei(price)
        if(hightbid.amount && base_price>price){
          let liveAuctions=this.state.liveAuctions
          let itemId=liveAuctions.itemId
          let owner= liveAuctions.owner
          let nftContract= liveAuctions.nftContract
         
          let acc = await loadWeb3();
          console.log("itemId",itemId)
    
          console.log("itemId",nftContract)
    
          let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
    
          await nftContractOf.methods.createBidOnItem(itemId,nftContract).send({
            from: acc,
            value:price
            
          })
          toast.success("Biding Successful")
        }else{
          toast.error("Bid price must be greater than base price and highest bid")
        }
       
      }
      catch(e){
        console.log("Create Bid Error",e);
      }
     
    }






    return (
      <Modal
        centered
        size='lg'
        show={this.props.isOpen}
        onHide={this.props.closeModal}
        // id={this.props.id}
      >
        <Modal.Header closeButton className='text-white'>

          <Modal.Title > Auction <span>{console.log("datataaaaaa",this.state.hightbid.amount)}</span></Modal.Title>
 
         
        </Modal.Header>
        <Modal.Body style={{ padding: '20px' }}>
          <Form.Group style={{ padding: '10px' }}>
            <Form.Label style={{ margin: '10px' }}>Reserve Price: 
            
     
              </Form.Label>
            <Form.Control
              type='text'
              onChange={this.handleChange2}
              value={this.state.price}
              id='price'
              placeholder='Enter reserve price in Ethers'
            />
          </Form.Group>
          {/* <Form.Group style={{ padding: '10px' }}>
            <Form.Label style={{ margin: '10px' }}>Duration:</Form.Label>
            <Form.Control
              type='text'
              onChange={this.handleChange3}
              value={this.state.duration}
              id='duration'
              placeholder='Enter duration in Hours'
            />
          </Form.Group> */}

          {
            console.log("bodyhere",setdisable)
          }
          
          <p className='timer_here'>CLAIM IN {Days_here} <small>d </small>{Hours_here} <small>h</small> {Munits_here} <small>m</small> {Seconds} <small>s</small></p>
          <button className='btn mt-2' disabled={setdisable}>Claim on Bid</button>

        <p className='top_martg'> <span className='text-white'>Highest Bid:</span> {hightbid.amount}</p>

        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="primary"
            type="submit"
            onClick={() => this.props.closeModal()}
          >
            Create Auction
          </Button> */}
          <button
            className='btn'
            type='submit'
            // style={{ color: 'black', background: 'white', border: 'none' }}
          onClick={()=>createBidOnItem()}
          >
            Create Auction
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}
