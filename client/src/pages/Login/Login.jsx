import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import style from "./Login.module.css";

export default function Login() {
  const [nameBuffer, setNameBuffer] = useState("Guest");
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const parrotNames = [
    "Alex",
    "Alois",
    "Apollo",
    "Angel",
    "Annie",
    "Arnie",
    "Artur",
    "Bady",
    "Bára",
    "Baruška",
    "Beri",
    "Bart",
    "Barney",
    "Baz",
    "Bedřich",
    "Bernie",
    "Bogie",
    "Bonnie",
    "Boris",
    "Bruno",
    "Brutus",
    "Bubu",
    "Buddy",
    "Bertík",
    "Candy",
    "Caesar",
    "Casper",
    "Clyde",
    "Coco",
    "Čip",
    "Čiko",
    "Daisy",
    "Dale",
    "Dan",
    "Diesel",
    "Dizzy",
    "Dusty",
    "Eddie",
    "Einstein",
    "Ella",
    "Elvis",
    "Erl",
    "Ernst",
    "Fagel",
    "Felix",
    "Ferda",
    "Fidel",
    "Figo",
    "Filípek",
    "Franklin",
    "Fraya",
    "Gabriel",
    "Gandalf",
    "Harry",
    "Henry",
    "Holy",
    "Honzík",
    "Hubert",
    "Hugo",
    "Charlie",
    "Chiquita",
    "Igor",
    "Indy",
    "Izzy",
    "Jacques",
    "Jacky",
    "Jasper",
    "Jeníček",
    "Jerry",
    "Jim",
    "Johny",
    "Káča",
    "Kája",
    "Karlík",
    "Kevin",
    "Kimi",
    "Kiki",
    "Kolumbus",
    "Kuba",
    "Laura",
    "Lenny",
    "Lola",
    "Lóra",
    "Lori",
    "Lucinka",
    "Luk",
    "Leošek",
    "Maddison",
    "Marley",
    "Max",
    "Mercedes",
    "Merlin",
    "Morfeus",
    "Morris",
    "Nemo",
    "Niki",
    "Noel",
    "Oliver",
    "Ollie",
    "Orfeus",
    "Ornela",
    "Oskar",
    "Otík",
    "Otokar",
    "Ozzy",
    "Paul",
    "Pepe",
    "Pepík",
    "Pluto",
    "Polly",
    "Presley",
    "Pepička",
    "Quentin",
    "Quido",
    "Ralf",
    "Rebeca",
    "Reggie",
    "Richie",
    "Riki",
    "Robík",
    "Robin",
    "Rocky",
    "Romeo",
    "Roko",
    "Rose",
    "Rosťa",
    "Rozárka",
    "Ruby",
    "Rudy",
    "Ruth",
    "Saly",
    "Sammy",
    "Sára",
    "Saša",
    "Scooby",
    "Sid",
    "Sparky",
    "Sony",
    "Stela",
    "Sydney",
    "Taz",
    "Timmy",
    "Toníček",
    "Tweety",
    "Uršula",
    "Vašek",
    "Viki",
    "Viktor",
    "Vinny",
    "Viktorka",
    "Wendy",
    "Winston",
    "Zachary",
    "Zed",
    "Zeus",
    "Ziggy",
    "Žako",
    "Žolík",
  ];

  useEffect(() => {
    if (name == null) return;
    console.log(name);
    navigate("/", { state: { name: name } });
  }, [name]);

  // const Button = styled.button`
  //   background-color: ${({ color }) => color || "rgb(91, 136, 63)"};
  //   border: none;
  //   color: white;
  //   padding: 15px 32px; 
  //   margin: 50px;
  //   text-align: center;
  //   text-decoration: none;
  //   display: inline-block;
  //   font-size: 1em;
  //   cursor: pointer;
  // `;

  return (
    <>
      <main>

        

        <div className={style.Wrapper}>
        <div className={style.Header}>
            <div className={style.Text}>
                Vítejte v <span className={style.ColorText}>Delta</span>Chatu
            </div>

        </div>
        <div className={style.Footer}>
            <div className={style.ContentWrapper}>
                <div className={style.Content}>
                    <div className={style.InputBox}>
                        <input
            className={style.Input}
            placeholder="Vaše přezdívka.."
            onChange={(e) => {
              setNameBuffer(e.target.value);
            }}
                        ></input>
                    </div>
                    <div className={style.BtnBox}>

                        <div className={style.BtnNext}>
                                <form action="index.html">
                                  <button
              className={style.Btn}
              onClick={() => {
                setName(nameBuffer);
              }}
            >
              Pokračovat
                                  </button>
                                </form>
                        </div>

                        <div className={style.BtnRandomName}>
                                <form action="index.html">
                                  <button
              className={style.Btn}
              onClick={() => {
                setName(
                  parrotNames[Math.floor(Math.random() * parrotNames.length)]
                );
              }}
            >
              Náhodné jméno
                                  </button>
                                </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        </div>

      

      </main>
    </>
  );
}
