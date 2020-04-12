import React, { Component } from 'react';
import './app.css'
import Fade from 'react-reveal/Fade'
import Card from './Components/Card'



class App extends Component {
  state = {
    fieldCard: {},
    currentPlayer: 1,
    player1: {
      name: 'Ashraf',
      cards: []
    },
    player2: {
      name: 'Ade',
      cards: []
    },
    cards: [
       {
         shape: 'cross',
         nums: [1,2,3,5,7,10,11,13,14]
       },
       {
         shape: 'triangle',
         nums: [1,2,3,4,5,7,8,10,11,12,13,14]
       },
       {
         shape: 'square',
         nums: [1,2,3,5,7,10,11,13,14]
       },
       {
         shape: 'circle',
         nums: [1,2,3,4,5,7,8,10,11,12,13,14]
       },
       {
         shape: 'star',
         nums: [1,2,3,4,5,7,8]
       },
    ]

  }

  // ['cross','triangle','square','circle','star']

  componentDidMount(){    
    this.initializeGame()
  }

  initializeGame = () => {
    this.setState({currentPlayer: 1})

    /////  Generating card details for main card and setting a fresh start ////////
    const shape = this.generateCard().shape
    const num = this.generateCard().num
    
    this.setState(
      {
        fieldCard:{
          shape,
          num
        },
        player1:{
        name: 'Ashraf',
        cards: []
      },
      player2:{
        name: 'Ade',
        cards: []
      }
    })

    /////////////// Loading cards for players ////////////////////////// 
    let count = 0
    for (count; count<5; count++) {
      this.loadCard(1)
      this.loadCard(2)
    }
    console.log(this.state.player1)
  }

  ///////////////  Card Generator  ////////////////////
  generateCard = () => {
    let randomNum = Math.floor(Math.random()*5)

    const shape = this.state.cards[randomNum].shape
    let shapeLength = this.state.cards[randomNum].nums.length

    let id = Math.floor(Math.random()*shapeLength)
    const num = this.state.cards[randomNum].nums[id]

    return {shape, num}
  }

  ////////////////////////// Card loader //////////////////////////
  loadCard = (player) =>{
    const shape = this.generateCard().shape
    const num = this.generateCard().num

    console.log(num, shape)

    const player1 = this.state.player1
    const player2 = this.state.player2

    /////////// checking for position to place card //////////
    if (player === 1) {
      player1.cards.push({
        shape,
        num
      })
  
      this.setState({player1})
    } else {
      player2.cards.push({
        shape,
        num
      })
  
      this.setState({player2})
    }
  }

  ////////////////////  Card placer ///////////////////////
  playCard = (shape, num) => {
    const player1 = this.state.player1
    const player2 = this.state.player2
    
    if (this.state.currentPlayer === 1) {
      const index = player1.cards.findIndex(e=>{
        return e.shape === shape && e.num === num
      })
      player1.cards.splice(index, 1)

      this.setState({player1})
      console.log(this.state.player1)
    } else {
      const index = player2.cards.findIndex(e=>{
        return e.shape === shape && e.num === num
      })
      player2.cards.splice(index, 1)

      this.setState({player2})
      console.log(this.state.player2)
    }

  }

  /////////////////// Card click listener ///////////////
  onCardClick = (card, shape, num, nextPlayer) => {
    console.log('card')

    card.preventDefault()
    
    if (this.state.currentPlayer === nextPlayer) {
      alert('not your turn')
    } else {
      if (this.state.fieldCard.shape === shape || this.state.fieldCard.num === num) {
        
        ////////// playing card //////////
        this.playCard(shape, num)

        ////////////////// Checking for winner ////////////////////

        if (this.state.player1.cards.length===0){
          alert('player1 is the winner')
          this.initializeGame()
        }else if (this.state.player2.cards.length===0){
          alert('player2 is the winner')
          this.initializeGame()
        }

        //////////////// replacinng main card with played /////////////////
        this.setState({
          fieldCard: {
            shape,
            num
          }
        })

        ///////////////////// checking for special cards /////////////////
        if (num === 1 || num === 8) {
          this.setState({currentPlayer: this.state.currentPlayer})
          console.log('there you go')
        }else {
          this.setState({currentPlayer: nextPlayer})
          console.log('move on')
        }

      } else {
        alert('card must be equal')
      }
    }
  }



  generalMarket = () => {
    this.loadCard(this.state.currentPlayer)
    if(this.state.currentPlayer===1){
      this.setState({currentPlayer: 2})
    }else{
      this.setState({currentPlayer: 1})
    }
  }

  render() {
    
    return (
      <div className="App">
        <div className="player player1">
          {
            this.state.player1.cards.map(e=>{
              return  <Card onCardClick={this.onCardClick} cardChild={this.cardChild} shape={e.shape} num={e.num}/>
            })
          }
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div className="field">
            <Card nextPlayer={2} shape={this.state.fieldCard.shape} num={this.state.fieldCard.num} />
          </div>
          <div className="market">
            <div className="card" onClick={this.generalMarket} >
              MARKET
            </div>
          </div>
        </div>
        <div className="player player2">
          {
            this.state.player2.cards.map(e=>{
              return  <Card nextPlayer={1} onCardClick={this.onCardClick} shape={e.shape} num={e.num}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
