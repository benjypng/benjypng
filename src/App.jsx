import memoji from "./memoji.png";
import Card from "./Card";
import { useState, useEffect } from "react";
import projectsList from "./projects.json";

const App = () => {
  const [projects] = useState(projectsList);
  const [toggle, setToggle] = useState(false);
  const [totalStars, setTotalStars] = useState([]);
  const [totalDownloads, setTotalDownloads] = useState([]);
  const [sumTotal, setSumTotal] = useState({});

  const handleToggle = (e) => {
    if (e.target.checked) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  const addStars = (stars) => {
    let tmpArr = totalStars;
    if (stars) {
      tmpArr.push(stars);
    }
    setTotalStars(tmpArr);
  };

  const addDownloads = (downloads) => {
    let tmpArr = totalDownloads;
    if (downloads) {
      tmpArr.push(downloads);
    }
    setTotalDownloads(tmpArr);
  };

  useEffect(() => {
    setSumTotal({
      totalStars: totalStars.reduce((a, b) => a + b, 0),
      totalDownloads: totalDownloads.reduce((a, b) => a + b, 0),
    });
  }, [totalStars, totalDownloads]);

  return (
    <div className={toggle ? "dark" : ""}>
      <div className="flex justify-center font-mono bg-white dark:bg-gray-900">
        <div className="px-3 py-6 w-96 sm:w-2/3 md:w-2/3 lg:w-2/3">
          {/* <!-- Start Here --> */}
          <div className="flex flex-wrap">
            <img
              src={memoji}
              className="rounded-full drop-shadow-2xl w-20 h-20 hover:animate-bounce"
              alt="memoji"
              aria-label="memoji"
            />
            <div className="text-left lg:ml-10 mt-5 dark:text-gray-300">
              <strong className="text-3xl">
                Hi! I'm Ben, a medical social worker.
              </strong>
              <p className="text-xl">
                Below are some of the things I've built.
              </p>
            </div>
          </div>

          {/* <!-- Socials --> */}
          <div className="py-2 my-4 flex flex-wrap gap-2">
            <a
              className="p-3 bg-blue-400 hover:bg-blue-200 rounded-lg text-white"
              href="https://www.twitter.com/hkgnp"
            >
              Twitter
            </a>
            <a
              className="p-3 bg-gray-700 hover:bg-gray-400 rounded-lg text-white"
              href="https://www.github.com/hkgnp"
            >
              Github <i className="fas fa-star"></i> {sumTotal.totalStars}{" "}
              <i className="fas fa-download"></i> {sumTotal.totalDownloads}
            </a>
            <a
              className="p-3 bg-purple-600 hover:bg-purple-400 rounded-lg text-white"
              href="https://discord.com/invite/KpN4eHY"
            >
              logseq@Discord
            </a>
            <a
              className="p-3 bg-yellow-300 hover:bg-yellow-200 rounded-lg"
              href="https://www.buymeacoffee.com/hkgnp.dev"
            >
              Buy Me a Coffee
            </a>
            <div className="relative inline-block w-10 ml-2 mt-3 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={toggle}
                onChange={handleToggle}
              />
              <label
                for="toggle"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <label
              for="toggle"
              className="text-xs text-gray-700 mt-4 dark:text-white"
            >
              <i className="fas fa-moon"></i>
            </label>
          </div>

          {/* <!-- Portfolio Start --> */}
          <div className="flex flex-wrap gap-1">
            {projects.map((p) => (
              <Card
                key={p.name}
                name={p.name}
                description={p.description}
                addStars={addStars}
                addDownloads={addDownloads}
              />
            ))}
          </div>
          {/* <!-- Portfolio End --> */}
        </div>
      </div>
    </div>
  );
};

export default App;
