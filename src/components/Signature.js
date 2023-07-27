import React, { useRef,useState } from 'react';
import html2canvas from 'html2canvas';
import {useLocation} from 'react-router-dom'
import globemovinglogo from '../globemovinglogo.jpg'
import {FaUser} from 'react-icons/fa'
import {LuNetwork} from 'react-icons/lu'
import {FaMobileAlt} from  'react-icons/fa'
import {GoMail} from 'react-icons/go'
import {BiSolidPhoneCall}  from  'react-icons/bi'
import {MdLocationPin} from 'react-icons/md'
import {RxGlobe} from 'react-icons/rx'
import tuvlogo from '../tuvlogo.png'
import faimpluslogo from '../faimpluslogo.jpg'
import fidilogo from '../fidilogo.jpg'
import iamlogo from '../iamlogo.png'
import omalogo from '../omalogo.png'
import imalogo from '../imalogo.png'
import paimalogo from '../paimalogo.jpg'
import weconnectlogo from '../weconnectlogo.jpg'
import handlogo from '../handlogo.PNG'
import './index.css'

function Signature() {
    const location=useLocation()
    const [data,setData]=useState(location.state)
    const [file, setFile] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const canvasRef = useRef(null);
    const componentRef = useRef();
    console.log(data.inputs.name)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    
        // Clear the resized image when a new image is selected
        setResizedImage(null);
      };
    const handleDownloadImage = () => {
      html2canvas(componentRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${data.inputs.name}_signature.png`;
        link.href = imgData;
        link.click();
      });
    };

    const handleResize=()=>{
        if (canvasRef.current && file) {
            const img = new Image();
            const reader = new FileReader();
      
            reader.onload = function (e) {
              img.src = e.target.result;
              img.onload = function () {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
      
                // Set the desired width and height for the resized image
                const desiredWidth = 300;
                const desiredHeight = 200;
      
                // Calculate the aspect ratio
                const aspectRatio = img.width / img.height;
      
                // Calculate the new width and height while maintaining the aspect ratio
                let newWidth = desiredWidth;
                let newHeight = desiredWidth / aspectRatio;
                if (newHeight > desiredHeight) {
                  newHeight = desiredHeight;
                  newWidth = desiredHeight * aspectRatio;
                }
      
                // Set the canvas size to match the new width and height
                canvas.width = newWidth;
                canvas.height = newHeight;
      
                // Draw the image onto the canvas with the desired size
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
      
                // Convert the canvas content to a Data URL (base64)
                const resizedDataURL = canvas.toDataURL('image/jpeg');
      
                setResizedImage(resizedDataURL);
              };
            };
      
            reader.readAsDataURL(file);
          }
    }
  return (
    <div>
        <div ref={componentRef} style={{paddingTop:'5px',paddingBottom:'15px',left:'0px',paddingRight:'0px',marginTop:'50px',minHeight:'100vh'}}>
            <div className='top-cont'>
                <img src={globemovinglogo} alt='globemovinglogo' className='globelogo' />
                <div className='icon-details-cont'>
                    <div className='icon-detail'>
                        <FaUser size={20} />
                        <p className='detail'>{data.inputs.name}</p>
                    </div>
                    <div className='icon-detail'>
                        <LuNetwork size={20} />
                        <p className='detail'>{data.inputs.designation}</p>
                    </div>
                    <div className='icon-detail'>
                        <FaMobileAlt size={20} />
                        <p className='detail'>{data.inputs.tel}</p>
                    </div>
                    <div className='icon-detail'>
                        <GoMail size={20} />
                        <p className='detail'>{data.inputs.email}</p>
                    </div>
                    <div className='icon-detail'>
                        <BiSolidPhoneCall size={20} />
                        <p className='detail'>+91 80 4211 5151</p>
                    </div>
                    <div className='icon-detail'>
                        <MdLocationPin size={20} />
                        <p className='detail'>#141, Sri Shanti Towers, 3rd Floor, Kasturi Nagar, Bangalore 560043. India</p>
                    </div>
                    <div className='icon-detail'>
                        <RxGlobe size={20} />
                        <p className='detail'>www.globemoving.net</p>
                    </div>
                </div>
                <img src={data.image} alt='pic' className='globelogo' />
            </div>
            <div className='second-cont'>
            <h1 className='answer'>THE ANSWER IS YES</h1>
            <div className='logos-container'>
                <img src={tuvlogo} alt='tuv' className='logo1'/>
                <img src={faimpluslogo} alt='faimplus' className='logo2' />
                <img src={fidilogo} alt='fidi' className='logo3'/>
                <img src={iamlogo} alt='iam' className='logo4' />
                <img src={omalogo} alt='oma' className='logo5'/>
                <img src={imalogo} alt='ima' className='logo6' />
                <img src={paimalogo} alt='paima'  className='logo7'/>
                <img src={weconnectlogo} alt='weconnect' className='logo8'/>
            </div>
            </div>
            <div className='third-cont'>
                <h6 className='service1'>Services: Home Moving | Office Moving | Asset Moving | Data Center Moving | Vehicle Moving | Pet Moving |</h6>
                <h6 className='indust1'>Industrial Moving | Lab Moving | Health Care Logistics | Hospitality Logistics | Storage | Warehousing</h6>
            </div>
            <div className='fourth-cont'>
                <p className='branch'>Our Branches In India: Bangalore | Chennai | Delhi | Kolkata | Mumbai | Pune | Cochin</p>
            </div>
            <div className='fifth-cont'>
            <img src={handlogo} alt='hand' className='hand' />
            <p className='email'>Please consider the environment before printing this e-mail!</p>
        </div>
        </div>
        <button onClick={handleDownloadImage} className='download'>Download</button>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleResize}>Resize Image</button>
      {resizedImage && <img src={resizedImage} alt="Resized Image" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default Signature