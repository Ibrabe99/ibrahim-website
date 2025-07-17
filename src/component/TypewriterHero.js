import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <div className='my-jop' >
        <h1 className='slam' >alsalam ealaykum </h1>
        <span>Welcome to my portfolio</span>
        <h1 className='my-name'>My name is Ibrahim</h1>


        <div className="work">
        <h1>I'm a - </h1>
      <h1>
        <span className='writer' >
          <Typewriter
          
            words={[' Programmer', ' Designer', ' Developer']}
            loop={0}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </h1>
      </div>
   
    </div>
  );
}
