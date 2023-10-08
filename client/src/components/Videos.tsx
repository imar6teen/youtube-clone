import "../assets/components/videos.css";
import thumbnail from "../assets/image/thumbnailex1.jpg";
import profilePicture from "../assets/image/pfp.jpg";

function Videos() {
  return (
    <div className="video">
      <div className="video__thumbnail">
        <img src={thumbnail} alt="Thumbnail" />
        <div className="video__thumbnail__time">
          <div className="video__thumbnail__time__time">
            <p>4:32:33</p>
          </div>
        </div>
      </div>
      <div className="video__desc">
        <div className="video__desc__profile_picture">
          <img src={profilePicture} alt="pfp" />
        </div>
        <div className="video__desc__description">
          <div className="video__desc__description__video_name">
            <p>GARASI - HILANG (Performance Video)</p>
          </div>
          <div className="video__desc__description__channel_status">
            <p>GinoMachino • 6.2M views • 7 months ago</p>
          </div>
        </div>
        <div className="video__desc__triple_dots">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Videos;
