import { useEffect, useState } from "react";
import axios from "axios";

const Card = (props) => {
  const [downloads, setDownloads] = useState();
  const [stars, setStars] = useState();
  const [loaded, setLoaded] = useState(false);

  const getResponses = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/hkgnp/${props.name}/releases`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      if (response.data.length === 0) {
        setDownloads("-");
      } else {
        let sumOfDownloads = [];
        for (let d of response.data) {
          if (d === undefined || d.assets.length === 0) {
            continue;
          } else {
            sumOfDownloads.push(d.assets[0].download_count);
          }
        }

        const reducer = (previousValue, currentValue) =>
          previousValue + currentValue;

        setDownloads(sumOfDownloads.reduce(reducer));
      }
    } catch (e) {
      console.log(e);
    }

    try {
      const response = await axios.get(
        `https://api.github.com/repos/hkgnp/${props.name}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      setStars(response.data.stargazers_count);
    } catch (e) {
      console.log(e);
    }

    setLoaded(true);
  };

  useEffect(() => getResponses());

  useEffect(() => {
    props.addStars(parseInt(stars));
    props.addDownloads(parseInt(downloads));
  }, [stars]);

  return (
    loaded && (
      <div className="m-3 ">
        <div
          className="hover:-translate-y-2 hover:translate-x-2
      max-w-sm
      w-80
      rounded-lg
      overflow-hidden
      shadow-lg dark:shadow-gray-700
      border border-pink-500 dark:bg-gray-800
    "
        >
          <div className="px-6 py-4 ">
            <div className="font-bold text-xl mb-2 dark:text-gray-300">
              {props.name}
            </div>
            <p className="text-gray-700 text-base dark:text-gray-300">
              {props.description}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2 ">
            <span
              className="
          inline-block
          bg-gray-200
          rounded-full
          px-3
          py-1
          text-sm
          font-semibold
          text-gray-700
          mr-2
          mb-2
        "
            >
              <i className="fas fa-download"></i> {downloads}
            </span>
            <span
              className="
          inline-block
          bg-gray-200
          rounded-full
          px-3
          py-1
          text-sm
          font-semibold
          text-gray-700
          mr-2
          mb-2
        "
            >
              <i className="far fa-star"></i> {stars}
            </span>
            <a
              className="
          inline-block
          bg-gray-200
          rounded-full
          px-3
          py-1
          text-sm
          font-semibold
          text-gray-700
          mr-2
          mb-2
        "
              href={`https://www.github.com/hkgnp/${props.name}`}
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default Card;
