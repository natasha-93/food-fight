import React from "react";
import styles from "./Cuisine.module.css";
import clsx from "clsx";

type CommonCuisineProps = {
  name: string;
  image: string;
};

type ClickableCuisineProps = {
  readOnly?: false;
  onClick: (index: number) => void;
  index: number;
};

type ReadOnlyCuisineProps = {
  readOnly: true;
};

type CuisineProps = CommonCuisineProps &
  (ClickableCuisineProps | ReadOnlyCuisineProps);

export default function Cuisine(props: CuisineProps) {
  return (
    <li
      className={clsx(styles.cuisine, {
        [styles.readonly]: props.readOnly,
      })}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("${props.image}")`,
      }}
      onClick={() => {
        if (!props.readOnly) {
          props.onClick(props.index);
        }
      }}
    >
      {props.name}
    </li>
  );
}
