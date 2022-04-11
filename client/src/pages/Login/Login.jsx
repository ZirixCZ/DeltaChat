import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [name, setName] = useState("Guest");
  const navigate = useNavigate();
  const toRoot = () => {
    navigate("/", { state: { name: name } });
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.wrapper}>
          <h1>
            Vítejte v{" "}
            <span id={styles.bold}>
              <span id={styles.green}>Delta</span>Chatu
            </span>
          </h1>
          <input
            className={styles.input}
            placeholder="Vaše přezdívka.."
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button
            className={styles.navigateButton}
            onClick={() => {
              toRoot();
            }}
          >
            Pokračovat
          </button>
        </div>
      </main>
    </>
  );
}
