// import React, { useState } from 'react';

// interface Dot {
//   x: number;
//   y: number;
// }

// const DotGenerator: React.FC = () => {
//     const [dots, setDots] = useState<Dot[]>([]);
//     const [pastDots, setPastDots] = useState<Dot[][]>([]);
//     const [futureDots, setFutureDots] = useState<Dot[][]>([]);

//   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
//     const { clientX, clientY } = event;
//     const boundingRect = event.currentTarget.getBoundingClientRect();

//     const newDot: Dot = {
//       x: clientX - boundingRect.left ,
//       y: clientY - boundingRect.top,
//     };

//     const newDots = [...dots, newDot];
//     setDots(newDots);
//     setPastDots([...pastDots, newDots]);
//     setFutureDots([]);
//   };

//   const handleReset = () => {
//     setDots([]);
//     setFutureDots([]);
//     setPastDots([]);
//   }

//   const handleUndo = () => {
//     if (pastDots.length === 0) return;

//     const previousDots = pastDots[pastDots.length - 1];
//     const newPastDots = pastDots.slice(0, pastDots.length - 1);

//     setDots(previousDots);
//     setPastDots(newPastDots);
//     setFutureDots([...futureDots, dots]);
//   };

//   const handleRedo = () => {
//     if (futureDots.length === 0) return;

//     const nextDots = futureDots[futureDots.length - 1];
//     const newFutureDots = futureDots.slice(0, futureDots.length - 1);

//     setDots(nextDots);
//     setPastDots([...pastDots, dots]);
//     setFutureDots(newFutureDots);
//   };

//   return (
//     <div className='main'>
//         <div className='options'>
//             <button onClick={handleUndo} disabled={pastDots.length === 0}>
//                 Undo
//             </button>
//             <button onClick={handleRedo} disabled={futureDots.length === 0}>
//                 Redo
//             </button>
//             <button onClick={handleReset}>
//                 Reset
//             </button>
//             <div>Dots: {JSON.stringify(dots)}</div>
//             <div>Past Dots: {JSON.stringify(pastDots)}</div>
//             <div>Future Dots: {JSON.stringify(futureDots)}</div>
//         </div>
//         <div
//             className='canvas'
//             onClick={handleClick}
//         >
//         {dots.map((dot, index) => (
//             <div
//             key={index}
//             style={{
//                 position: 'absolute',
//                 top: dot.y,
//                 left: dot.x,
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 backgroundColor: 'red',
//             }}
//             ></div>
//         ))}
//     </div>
        
//     </div>


//   );
// };

// export default DotGenerator;

import { userInfo } from 'os';
import React, { useState } from 'react';

interface Dot {
  x: number;
  y: number;
}

const DotGenerator: React.FC = () => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [removedDots, setRemovedDots] = useState<Dot[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const boundingRect = event.currentTarget.getBoundingClientRect();

    const newDot: Dot = {
      x: clientX - boundingRect.left ,
      y: clientY - boundingRect.top,
    };

    const newDots = [...dots, newDot];
    setDots(newDots);
    setRemovedDots([]);
  };

  const handleUndo = () => {
    // console.log("dots", dots);

    let lastIndex = dots.length -1;
    let removedItem = dots[lastIndex];
    // setRemovedDots([dots[lastIndex]]);

    const remainingItems = dots.slice(0, lastIndex);

    setDots(remainingItems);
    setRemovedDots([...removedDots, removedItem])

  }

  const handleRedo = () => {
    if(!removedDots.length) return
    let lastIndex = removedDots.length -1;
    let removedItem = removedDots[lastIndex];
    
    const remainingItems = removedDots.slice(0, lastIndex);

    setRemovedDots(remainingItems)
    setDots([...dots, removedItem]);
  }

  return (
    <div className='main'>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <div>
            {JSON.stringify(dots)}
        </div>
        <div>
            {JSON.stringify(removedDots)}
        </div>
        <div
            className='canvas'
            onClick={handleClick}
        >
        {dots.map((dot, index) => (
            <div
            key={index}
            style={{
                position: 'absolute',
                top: dot.y,
                left: dot.x,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: 'red',
            }}
            ></div>
        ))}
    </div>
    </div>
  );
};

export default DotGenerator;
