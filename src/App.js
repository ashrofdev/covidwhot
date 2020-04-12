import React, { Component } from 'react';
import './app.css'
import Fade from 'react-reveal/Fade'
import Card from './Components/Card'



class App extends Component {
  state = {
    fieldCard: {
      shape: 'triangle',
      num: 4
    },
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
       [1,2,3,5,7,10,11,13,14],
       [1,2,3,4,5,7,8,10,11,12,13,14],
       [1,2,3,5,7,10,11,13,14],
       [1,2,3,4,5,7,8,10,11,12,13,14],
       [1,2,3,4,5,7,8],
    ]

  }

  componentDidMount(){
    this.initializeGame()
    this.setState({currentPlayer: 1})
    const test = ['name', 'of','the','people']
    test.splice(test.indexOf('of'), 1)
    console.log(test.indexOf('people'), test)
  }

  initializeGame = () => {
    let count = 0
    for (count; count<5; count++) {
      this.loadCard(1)
      this.loadCard(2)
    }

    console.log(this.state.player1)


  }

  loadCard = (player) =>{
    setTimeout(() => {
      let num = Math.floor(Math.random()*6)
    let shapes = ['cross','triangle','square','circle','star']

    const shape = shapes[num]


    let numbers = this.state.cards[num]
    let len = numbers.length
    let num2 = Math.floor(Math.random()*len)

    const number = numbers[num2]

    console.log(num2, shape, numbers,len,number)

    const player1 = this.state.player1
    const player2 = this.state.player2

    if (player === 1) {
      player1.cards.push({
        shape,
        num: number
      })
  
      this.setState({
        player1
      })
    } else {
      player2.cards.push({
        shape,
        num: number
      })
  
      this.setState({
        player2
      })
    }
    }, 1000);
  }


  onCardClick = (card, shape, num, nextPlayer) => {
    card.preventDefault()
    
    if (this.state.currentPlayer === nextPlayer) {
      alert('not your turn')
    } else {
      if (this.state.fieldCard.shape === shape || this.state.fieldCard.num === num) {
        

        const player1 = this.state.player1
        const player2 = this.state.player2

        if (this.state.currentPlayer === 1) {
          player1.cards.splice(player1.cards.indexOf({
            shape,
            num
          }), 1)
          this.setState({player1})
          console.log(this.state.player1.cards)
        } else {
          player2.cards.splice(player2.cards.indexOf({
            shape,
            num
          }), 1)
          this.setState({player2})
          console.log(this.state.player2.cards)
        }

        ////////////////// Checking for winner ////////////////////

        if (this)

        this.setState({
          fieldCard: {
            shape,
            num
          },
          currentPlayer: nextPlayer
        })


        // document.querySelector('.field').classList.add('anime')
        // setTimeout(() => {
        //   document.querySelector('.field').classList.remove('anime')
        // }, 1000);
      } else {
        alert('card must be equal')
      }
    }
  }

  cardChild = (e, shape, num, nextPlayer) => {

    // if (this.state.currentPlayer === nextPlayer) {
    //   console.log('...')
    // } else {
    //   if (this.state.fieldCard.shape === shape || this.state.fieldCard.num === num) {
    //     e.target.parentElement.remove()
    //     this.setState({currentPlayer: nextPlayer})
    //   } else {
    //     alert('card must be equal')
    //   }
    // }

    console.log('fjfj')
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
              return  <Card nextPlayer={1} onCardClick={this.onCardClick} cardChild={this.cardChild} shape={e.shape} num={e.num}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default App;
