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

  // This handles when you purchase a color
  const handleClick = color => {
    setMoney(money - color.cost);
    color.amount++; // Set as state
    color.cost *= 1.2; // Set as state

    // Update the color multiplier every 10 levels to x2
    // TODO: Handle as state
    if (color.amount > 0 && color.amount % 10 === 0) {
      color.multiplier *= 2;
    }

    // Update the colors totalMps accordingly every time you purchase one
    // TODO: Move this once upgrades come in
    color.totalMps = color.amount * color.mps * color.multiplier;
    checkMPS();
  };

  // This runs every time you purchase a color
  // This will probably update at upgrade purchases once they come out
  const checkMPS = () => {
    let totalMps = 0;
    colors.forEach(color => {
      totalMps += color.totalMps;
    });

    setMps(totalMps);
  };

  // This checks to see if the user has seen the color to 'unlock' it permanently
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
                {color.name} - Increment by {color.mps * color.multiplier}/s |
                Total: {color.totalMps}/s
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
