import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header.js';
import News from './components/News.js';
import Bitcoin from './components/Bitcoin.js';
import CryptoNews from "./components/CryptoNews.js";


function App() {

  const [bitcoin, setBit] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchBit, setSearchBit] = useState('');

//CRIPTOCURRENCY API

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    axios({
      method: 'GET',
      url: 'https://coingecko.p.rapidapi.com/coins/markets',
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        ids: searchBit,
      },
      headers: {
        'x-rapidapi-host': 'coingecko.p.rapidapi.com',
        'x-rapidapi-key': '836053b102mshb0f14f728934a07p13c433jsne14af3cc3797'
      }
    }).then((response) => {
      setBit(response.data);
    })
      .catch(function (error) {
        console.error(error);
      })

  }, [searchBit]);


  const handleInput = (event) => {
    setUserInput(event.target.value.toLowerCase());
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchBit(userInput);
    setUserInput('');
  }

// APIA GENERAL NEWS FROM N. Y. TIMES

  const [news, setNews] = useState([]);
  const [news2, setNews2] = useState([]);
  const [news3, setNews3] = useState([]);
const [news4, setNews4] = useState([]);

  useEffect(() => {

    axios({
  method: 'GET',
  url: 'https://mboum-finance.p.rapidapi.com/ne/news',
  headers: {
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
    'X-RapidAPI-Key': '836053b102mshb0f14f728934a07p13c433jsne14af3cc3797'
  }
    }).then(function (response) {
      console.log(response)
      setNews(response.data)
      setNews2(response.data)
      setNews3(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }, []);


  // GENERAL NEWS FROM CRYPTOCURRENCY

const [cryptNews, setCryptoNews] = useState([]);


  useState(() => {

    axios({
      method: 'GET',
      url: 'https://newsx.p.rapidapi.com/search',
      params: { q: 'cryptocurrency', limit: '10', skip: '0' },
      headers: {
        'x-rapidapi-host': 'newsx.p.rapidapi.com',
        'x-rapidapi-key': 'ba03013e72msh29791eea6f2075fp118b2ejsn1f7186d6140e',
      }
    }).then(function (response) {
      setCryptoNews(response.data)
    }).catch(function (error) {
      console.error(error);
    });
  }, []);
  
  return (
    <div className='for-img' >
      <div className="content-container">
        

        <Header
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          setUserInput={setUserInput}
          userInput={userInput}
        />

        {
          bitcoin.length !== 0 ? 
        <Bitcoin 
              bitcoin={bitcoin}
              userInput={userInput}
              searchBit={searchBit}
        />
        : 
        (
        <>
        <CryptoNews cryptNews={cryptNews}/>
        <News
              news={news}
              news2={news2}
              news3={news3} 
              // news4={news4}
              />
        </>
        )
        }
      </div>
      <Footer />
    </div>

  );
}

export default App;
