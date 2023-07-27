import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
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
import '../App.css'

function Form() {
  const [inputs, setInputs] = useState({});
  const [image,setImage]=useState(null)
  const navigate=useNavigate()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleChangePic=(event)=>{
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/signature',{state:data})
  }
  const data={inputs,image}
  console.log(data)
  return (
    <div >
      <div className='container'>
        <div className='top-container'>
            <img src={globemovinglogo} alt='globemovinglogo' className='globelogo' />
            <div className='icon-details-cont'>
                <div className='icon-detail'>
                    <FaUser size={20} />
                    <p><input 
                        id='name'
                        type="text" 
                        name="name" 
                        value={inputs.name || ""} 
                        onChange={handleChange}
                        />
                        </p>
                </div>
                <div className='icon-detail'>
                    <LuNetwork size={20}/>
                    <p><input 
                        id='designation'
                        type="text" 
                        name="designation" 
                        value={inputs.designation || ""} 
                        onChange={handleChange}
                    /></p>
                </div>
                <div className='icon-detail'>
                    <FaMobileAlt size={20}/>
                    <p><input 
                        id='telephone'
                        type="text" 
                        name="tel" 
                        value={inputs.tel || ""} 
                        onChange={handleChange}
                    /></p>
                </div>
                <div className='icon-detail'>
                    <GoMail size={20}/>
                    <p><input 
                        id='email'
                        type="text" 
                        name="email" 
                        value={inputs.email || ""} 
                        onChange={handleChange}
                    /></p>
                </div>
                <div className='icon-detail'>
                    <BiSolidPhoneCall size={20}/>
                    <p className='detail'>+91 80 4211 5151</p>
                </div>
                <div className='icon-detail'>
                    <MdLocationPin size={20}/>
                    <p className='detail'>#141, Sri Shanti Towers, 3rd Floor, Kasturi Nagar, Bangalore 560043. India</p>
                </div>
                <div className='icon-detail'>
                    <RxGlobe size={20}/>
                    <p className='detail'>www.globemoving.net</p>
                </div>
            </div>
            <div className='file'>
                <input 
                type="file" 
                accept="image/*"
                name="pic"  
                onChange={handleChangePic}
                />
            </div>
        </div>
        <div className='second-container'>
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
        <div className='third-container'>
            <h6 className='service'>Services: Home Moving | Office Moving | Asset Moving | Data Center Moving | Vehicle Moving | Pet Moving |</h6>
            <h6 className='indust'>Industrial Moving | Lab Moving | Health Care Logistics | Hospitality Logistics | Storage | Warehousing</h6>
        </div>
        <div className='fourth-container'>
            <p className='branch'>Our Branches In India: Bangalore | Chennai | Delhi | Kolkata | Mumbai | Pune | Cochin</p>
        </div>
        <div className='fifth-container'>
            <img src={handlogo} alt='hand' className='hand' />
            <p className='email'>Please consider the environment before printing this e-mail!</p>
        </div>
    </div>
    <button type='submit' onClick={handleSubmit} className='submit'>Submit Changes</button>
    </div>
  );
}

export default Form