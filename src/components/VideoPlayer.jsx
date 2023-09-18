import { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css'
import Direction from './Direction';


const initText = {
  content:'',
  color:'#ffffff',
  fontSize:15,
  left:0,
  top:0
};

export default function VideoPlayer() {

  const videoRef = useRef(null);
  //The column that contains the video
  const colVideoRef = useRef(null);


  const [videoUrl, setVideoUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [text,setText] = useState(initText);
  

  //set initial position of the overlay div to be center top of the video
  //The following code will be executed just once because the dependency array is empty
  useEffect(()=>{
    setText(prevText => {
      return {...prevText,left:(colVideoRef.current.offsetWidth - 400) /2,top:20}
    });
  },[]);

  function handleVideoChange(e) {

    if (e.target.files.length !== 0) {

      setPlaying(false);
      let file = e.target.files[0];

      if (!file.type.includes('video/')) {
        alert('Please select a video file.');
        e.target.value = '';
      }else{
        setVideoUrl(URL.createObjectURL(file));  
      }
      
    } 
  }

  function handleTextChange(e){
    setText(prevText => { return {...prevText,[e.target.name]:e.target.value} }); 
  }

  function handleDirectionChange(e){
    switch (e.target.name) {
      case 'btnLeft':
        setText(prevText => { 
          if (prevText.left <= 0) {
            return {...prevText,left:initText.left};
          }
          return {...prevText,
                  left:prevText.left - 5} }); 
        break;
      case 'btnRight':
        setText(prevText => { 
          //width of column = 400 , padding-left:12 , padding-right:12
          if (prevText.left > (colVideoRef.current.offsetWidth - 424)) {
            return {...prevText,left:colVideoRef.current.offsetWidth - 424};
          }
          return {...prevText,
                  left:prevText.left + 5} }); 
        break;
      case 'btnTop':
        setText(prevText => { 
          if (prevText.top <= 0) {
            return {...prevText,top:initText.top};
          }
          return {...prevText,
                  top:prevText.top - 5} }); 
        break;
      case 'btnBottom':
        setText(prevText => { 
          //350 because 400 is the height of the div and 50 is the height of the overlay
          if (prevText.top > 350) {
            return {...prevText,top:350};
          }
          return {...prevText,
                  top:prevText.top + 5} }); 
        break;
      default:
        setText(prevText => prevText);
        break;
    }
  }

  function handlePlayPause(){
    const video = videoRef.current;
    let isPlay = ''
    if (video.paused) {
      video.play()
      isPlay = true
    } else {
      video.pause()
      isPlay = false
    }
    setPlaying(isPlay)
  }

  function handleReset(){
      setVideoUrl(null);
      setPlaying(false);
      setText(prevText => {
        return {...initText,left:prevText.left,top:prevText.top}
      });
  }
  function handleClickToReset(e){
    e.target.value = '';
  }

  return (
    <div className='container'>
      <div className='row justify-content-center'>

        <h2 className="display-3 text-primary fw-bold text-center my-4">React Video Player App</h2>

        <div className='col-12 col-md-6' ref={colVideoRef} id='col'>

            <div className='position-relative w-100' 
                 style={{height:'400px',
                        maxHeight:'400px',
                        overflow:'hidden'}}>
                {

                  (videoUrl && (
                                <div>
                                  <video
                                      className='w-100 h-100'
                                      src={videoUrl}
                                      ref={videoRef}
                                      type="video/*"
                                      loop>
                                      Your browser does not support the video tag.
                                  </video>

                                  {
                                      text.content && (
                                          <div 
                                              className='overlay-layer text-wrap'
                                              style={{
                                                      left:text.left,
                                                      top:text.top
                                                      }}>
                                              <p style={{color:text.color,
                                                        fontSize:`${text.fontSize}px`
                                                        }}>
                                                {text.content}
                                              </p>
                                          </div>
                                      )
                                  }
                              </div>)) || (<div className='w-100 h-100 init-background'></div>)
                }
                    
                    
            </div>

            <div className='d-flex justify-content-between'>
                
                <div className="custom-file my-3">
                    <input 
                        type="file"
                        accept='video/*'
                        className="custom-file-input"
                        id="customFile" 
                        onChange={handleVideoChange} 
                        onClick={handleClickToReset}
                        multiple={false}
                    />
                    <label 
                        className="custom-file-label" 
                        htmlFor="customFile" >
                        Upload A New Video
                    </label>
                </div>
                
                {
                    videoUrl && (
                        <div className='my-3'>
                            <button 
                                className='btn btn-success btn-play-pause' 
                                onClick={handlePlayPause}>
                                    {playing ? 'Pause' : 'Play'}
                            </button>
                        </div>
                    )
                }
            </div>

        </div>
        {
          videoUrl && (
              <div className='col-12 col-md-6 border p-3 my-4'>

                <div className="container">

                  <div className="row align-items-center">

                    <div className="col-12 col-md-6 my-3">
                      <label className='form-label'>Add Text</label>
                      <input type="text" name='content' className="form-control" onChange={handleTextChange}/>
                    </div>

                    <div className="col-12 col-md-6 my-3">
                    <label className='form-label'>Select Font Size</label>
                      <select 
                        className="form-select" 
                        name='fontSize' 
                        onChange={handleTextChange}
                        value={text.fontSize}>
                        <option value="15">15px</option>
                        <option value="20">20px</option>
                        <option value="25">25px</option>
                      </select>                                              
                    </div>

                  </div>
                </div>

                <div className="container">
                  <div className="row align-items-center">

                    <div className="col-12 col-md-6 my-3 d-flex justify-content-between">
                      <label className='form-label'>Choose Text Color</label>
                      <input 
                          type="color"
                          name='color' 
                          className="form-control form-control-color"
                          value={text.color}
                          onChange={handleTextChange}/>
                    </div>

                    <div className="col-12 col-md-6 my-3">
                      {text.content && <Direction onClickArrow={handleDirectionChange}/>}
                    </div>

                  </div>
                </div>
                
          </div>
          )
        }
        
      </div>
      <button className='btn btn-lg btn-danger my-3 w-25' onClick={handleReset}>Reset</button>
    </div>
  );
}
 