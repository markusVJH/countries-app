import React, {useState} from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';
  
const BackToTopButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 400){
      setVisible(true)
    } 
    else if (scrolled <= 400){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <Button
      variant='dark'
      className={`backToTop ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}>
      <i className="bi bi-arrow-up"></i>
    </Button>
  );
}
  
export default BackToTopButton;