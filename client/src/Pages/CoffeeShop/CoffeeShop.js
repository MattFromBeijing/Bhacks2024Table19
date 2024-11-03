import AudioPlayer from "../../Audio/AudioPlayer"; // Adjust the path if necessary

import "./CoffeeShop.css";

function CoffeeShop() {
  return (
    <div className="background-wrapper">
      <img className="coffeehouse" src="coffeehouse.png" alt="coffeehouse" />
      <img className="jukebox" src="jukebox.png" alt="juke" />
      <img className="coffee" src="coffee.png" alt="coffee" />
      <img className="bread" src="bread.png" alt="bread" />
      <AudioPlayer />
      {/* <AudioPlayer /> */}
    </div>
  );
}

export default CoffeeShop;
