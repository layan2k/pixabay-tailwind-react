import {useState, useEffect} from 'react';
import Imagecard from './components/imagecard';
import ImageSearch from './components/imageSearch';


function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(
    () => {
    fetch(`https://pixabay.com/api/?key=22753044-11eaf2d9328b7df04e81d83ad&q=${term}&image_type=photo`)
    .then((res) => res.json())
    .then(data => {
      setImages(data.hits);
      setisLoading(false)
    })
    .then(err => console.log(err));
    }, [term]
    );
  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1> }
    {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
      <div className="grid grid-cols-3 gap-4">
        {images.map(image => (
          <Imagecard key={image.id} image={image} />
        ))}
      </div>}
    </div>


  );
}

export default App;
