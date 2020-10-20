import React, { useEffect, useState } from 'react';
import Color from './Color';
import { colors } from './data';
import { numFormatter } from './util';

function App() {
  const [money, setMoney] = useState(1);
  const [mps, setMps] = useState(0);

  // Game loop every 1 second (1000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setMoney(money + mps);
    }, 1000);

    return () => {
      //cleanup
      clearInterval(interval);
    };
  }, [money, mps]);

  const handleClick = color => {
    setMoney(money - color.cost);
    setMps(mps + color.mps);
    color.amount++; // Set as state
    color.cost *= 1.2; // Set as state
  };

  const checkUnlocks = color => {
    if (money >= color.moneyReq) {
      color.isUnlocked = true;
    }

    return color.isUnlocked;
  };

  return (
    <div className='container'>
      <div>Welcome to Idle Colors</div>
      <div>$ {numFormatter(money)}</div>
      <div>$ {numFormatter(mps)}/s</div>
      <hr />

      {colors.map(
        color =>
          checkUnlocks(color) && (
            <div key={color.id}>
              <div style={{ backgroundColor: `${color.name}` }}>
                {color.name} - Increment by {color.mps}/s
              </div>
              <div>Amount: {color.amount}</div>
              <div>$ {numFormatter(color.cost)}</div>
              <button
                disabled={money < color.cost}
                name={color.name}
                onClick={() => handleClick(color)}>
                Buy 1 {color.name}
              </button>
            </div>
          )
      )}
    </div>
  );
}

export default App;
