import React from 'react';
import './card.css'
import Fade from 'react-reveal/Fade'

const Card = ({shape, num, onCardClick, cardChild, nextPlayer}) => {
    return (
        <Fade right>
            <div className="card" onClick={(e)=>onCardClick(e, shape, num, nextPlayer)} >

                <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} className="num">{num}</div>
                {
                    shape === 'star'?
                    <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} style={{fontSize: '5rem', paddingTop: '1rem', paddingLeft:'.6rem'}} className="shape">✮</div>:
                    shape === 'square'?
                    <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} className="shape">⬛️</div>:
                    shape === 'triangle'?
                    <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} style={{fontSize: '4.5rem', paddingTop: '.3rem', paddingLeft:'.6rem'}} className="shape">▲</div>:
                    shape === 'circle'?
                    <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} className="shape">⚫️</div>:
                    shape === 'cross'?
                    <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} style={{fontSize: '5rem', paddingTop: '1rem'}} className="shape">✙</div>:null
                }
                <div onClick={(e)=>cardChild(e, shape, num, nextPlayer)} className="num2">{num}</div>

            </div>
        </Fade>
    );
};

export default Card;