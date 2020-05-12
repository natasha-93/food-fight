import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import styles from "./App.module.css";
import Cuisine from "./Cuisine";

const defaultCuisines: Cuisine[] = [
  {
    id: 1,
    name: "Italian",
    image: require("./img/italian.jpeg"),
  },
  {
    id: 2,
    name: "Mexican",
    image: require("./img/mexican.jpeg"),
  },
  {
    id: 3,
    name: "Middle Eastern",
    image: require("./img/middle-eastern.jpeg"),
  },
  {
    id: 4,
    name: "Indian",
    image: require("./img/indian.jpeg"),
  },
  {
    id: 5,
    name: "Brunch",
    image: require("./img/brunch.jpg"),
  },
  {
    id: 6,
    name: "Mediterranean",
    image: require("./img/mediterranean.jpg"),
  },
  {
    id: 8,
    name: "Burger",
    image: require("./img/burger.jpeg"),
  },
  {
    id: 9,
    name: "Sushi",
    image: require("./img/sushi.jpeg"),
  },
  {
    id: 10,
    name: "Asian",
    image: require("./img/asian.jpeg"),
  },
  {
    id: 11,
    name: "Pizza",
    image: require("./img/pizza.jpeg"),
  },
  {
    id: 12,
    name: "Pasta",
    image: require("./img/pasta.jpeg"),
  },
];

type Cuisine = {
  id: number;
  name: string;
  image: string;
};

function App() {
  const [cuisines, setCuisines] = useState<Cuisine[]>(shuffle(defaultCuisines));
  const [candidates, setCandidates] = useState<[number, number]>([0, 1]);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  useEffect(() => {
    cuisines.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, [cuisines]);

  return (
    <div className={styles.app}>
      <video autoPlay muted loop className={styles.video}>
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {winnerIndex == null && (
        <span className={styles.header}>What sounds better?</span>
      )}
      <div>
        {winnerIndex == null && (
          <ul className={styles.cuisineContainer}>
            {candidates.map((index) => {
              const { name, image } = cuisines[index];
              return (
                <React.Fragment key={index}>
                  <Cuisine
                    index={index}
                    name={name}
                    image={image}
                    onClick={(e) => {
                      const nextIndex = Math.max(...candidates) + 1;
                      if (nextIndex > cuisines.length - 1) {
                        setWinnerIndex(index);
                      } else {
                        setCandidates([index, nextIndex]);
                      }
                    }}
                  />
                  {index === 0 && <span className={styles.or}>or</span>}
                </React.Fragment>
              );
            })}
          </ul>
        )}
        {winnerIndex != null && (
          <div>
            <span className={styles.winner}>Winner</span>
            <Cuisine
              readOnly={true}
              name={cuisines[winnerIndex].name}
              image={cuisines[winnerIndex].image}
            />
          </div>
        )}
        <button
          className={styles.resetButton}
          onClick={(e) => {
            setWinnerIndex(null);
            setCandidates([0, 1]);
            setCuisines(shuffle(defaultCuisines));
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
