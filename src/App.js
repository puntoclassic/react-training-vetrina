import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [listings, setListings] = useState([]);


  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:4400/listings");
    setTimeout(() => {
      setIsLoading(false);
      setListings(data);
    }, 2000)
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <div className="App">
      <div className="row g-0 h-100">
        {isLoading ? <LoadingProgress /> : <></>}
        {isError ? <ErrorPage /> : <></>}
        {listings.length > 0 ? <ListingsSlideShow listings={listings} /> : <></>}
      </div>
    </div>
  );
}

function ListingsSlideShow({ listings }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCurrentIndex((oldIndex) => {
        return oldIndex < listings.length - 1 ? oldIndex + 1 : 0
      });
    }, 2000);
  }, [])


  return <>
    <div className="ListingSlideShow" style={{ backgroundColor: "black" }}>
      <div style={{ backgroundImage: `url(${listings[currentIndex].immagine})`, height: "100%", backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>
        <div style={{ backgroundColor: "#0000004a", height: "100%" }}>
          <div className="p-4 text-light">
            <div className="p-4 text-light" style={{ backgroundColor: "black", width: "20%" }}>
              <h4>{listings[currentIndex].nome}</h4>
              <h6>{listings[currentIndex].prezzo} €</h6>
              <p>{listings[currentIndex].descrizione}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

function LoadingProgress() {
  return <>
    <div style={{ backgroundColor: "black" }} className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  </>
}

function ErrorPage() {
  return <>
    <div style={{ backgroundColor: "black" }} className="d-flex justify-content-center align-items-center">
      <p style={{ color: "white" }}>Si è verificato un errore, torneremo presto</p>
    </div>
  </>
}

export default App;
