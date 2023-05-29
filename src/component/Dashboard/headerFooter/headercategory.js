import React from 'react';
// import axios from 'axios';
import { useHistory } from 'react-router-dom';
import cooking from "../../image/cooking.png"
import gadgets from "../../image/gadgets.jpeg"
import mobile from "../../image/Mobile.png"
import computer from "../../image/computer.png"
import appliance from "../../image/e-appliance.png"
import officeimg from "../../image/office.png"
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import "../headerFooter/header.css"
function HeaderCategory(){
    const history=useHistory();
//  const [data, setData] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:5000/product')
//       .then(res => setData(res.data))
//       .catch(err => console.log(err));
//   }, []);
  function Allitems(category){
    history.push(`/allitem?name=${encodeURIComponent(category)}`);
  }

    return(
        <div>
                   <div className="header-2" >
            <div className='ctg-flex' >
                <img src={cooking} className="header-img" alt='Cooking'></img>
                <div className="dropdown">
                    <p className="dropbtn">Cooking appliance <ArrowDropDownOutlinedIcon fontSize='14px' /></p>
                         <div className="dropdown-content top">
                             <p onClick={()=>Allitems('Coffee,Tea&Espresso')} >Coffee,Tea&Espresso Maker</p>
                             <p  onClick={()=>Allitems('DigitalKitchenScales')} >DigitalKitchenScales</p>
                             <p  onClick={()=>Allitems('ElectricKettles')} >Electric Kettles</p>
                             <p  onClick={()=>Allitems('EggBoilers')} >Egg Boilers</p>
                             <p  onClick={()=>Allitems('HandBlenders')} >Hand Blenders</p>
                             <p  onClick={()=>Allitems('InductionCooktop')} >Induction Cooktop</p>
                             <p  onClick={()=>Allitems('JuicerMixerGrinders')} >Juicer,Mixer&Grinders</p>
                             <p  onClick={()=>Allitems('MiniFoodProcessors&Choppers')} >Mini Food Processors & Choppers</p>
                             <p  onClick={()=>Allitems('MixerGrinders')} >Mixer Grinders</p>
                             <p  onClick={()=>Allitems('Rice&PastaCookers')} >Rice&PastaCookers</p>
                             <p  onClick={()=>Allitems('SewingMachines&Accessories')} >SewingMachines & Accessories</p>
                             <p  onClick={()=>Allitems('SandwichMakers')} >SandwichMakers</p>   
                        </div>
                </div>
                
            </div>

            <div className='ctg-flex'>
                <img src={gadgets} className="header-img" alt='Electronics'></img>
                <div className="dropdown">
                    <p className="dropbtn">Electronics gadgets<ArrowDropDownOutlinedIcon fontSize='14px' /></p>
                         <div className="dropdown-content top">
                             <p  onClick={()=>Allitems('GeneralPurposeBatteries&BatteryChargers')} >Batteries & BatteryChargers</p>
                             <p  onClick={()=>Allitems('HomeTheater,TV&Video|Accessories|Cables')} >Cables</p>
                             <p  onClick={()=>Allitems('Cameras&Photography')} > Cameras & Photography</p>
                             <p  onClick={()=>Allitems('Headphones,Earbuds&Accessories')} >Headphones,Earbuds & Accessories</p>
                             <p  onClick={()=>Allitems('HomeAudio')} >HomeAudio & Speakers</p>
                             <p  onClick={()=>Allitems('MemoryCards')} >MemoryCards</p>
                             <p  onClick={()=>Allitems('Projectors')} >Projectors</p>
                             <p onClick={()=>Allitems('SmartWatches')} >Smart Watches</p>
                             <p  onClick={()=>Allitems('TabletAccessories')} >Tablet Accessories</p>
                             <p  onClick={()=>Allitems('RemoteControls')} >Remote Controls</p>
                             <p  onClick={()=>Allitems('SatelliteReceivers')} >Satellite Receivers</p>
                             <p  onClick={()=>Allitems('Televisions')} >Televisions</p>
                             <p  onClick={()=>Allitems('TVMounts,Stands&Turntables')} >TVWall & CeilingMounts</p>
                             
                             
                        </div>
                </div>
            </div>

            <div className='ctg-flex'>
                <img src={mobile} className="header-img" alt='mobile Accesories'></img>
                <div className="dropdown">
                    <p className="dropbtn">Mobile Accesories<ArrowDropDownOutlinedIcon fontSize='14px' /></p>
                         <div className="dropdown-content top">
                            <p  onClick={()=>Allitems('Cases&Covers|BasicCases')} >Basic Cases</p>
                             <p onClick={()=>Allitems('MobileAccessories|Chargers')} >Chargers</p>
                             <p  onClick={()=>Allitems('Mounts')} >Mounts</p>
                             <p  onClick={()=>Allitems('OTGAdapters')} >OTGAdapters</p>
                             <p  onClick={()=>Allitems('PowerBanks')} >PowerBanks</p>
                             <p  onClick={()=>Allitems('Photo&VideoAccessories')} >Photo & VideoAccessories</p>
                             <p  onClick={()=>Allitems('ScreenProtectors')} >Screen Protectors</p>
                             <p  onClick={()=>Allitems('Stands')} >Stands</p>
                             <p  onClick={()=>Allitems('StylusPens')} >Stylus Pens</p>     
                        </div>
                </div>
            </div>

            <div className='ctg-flex'>
                <img src={appliance} className="header-img" alt='home appliance'></img>
                <div className="dropdown">
                    <p className="dropbtn">Home Appliance<ArrowDropDownOutlinedIcon fontSize='14px' /></p>
                         <div className="dropdown-content top">
                            <p  onClick={()=>Allitems('CraftMaterials')} >Craft Materials</p>
                             <p onClick={()=>Allitems('Fans')} >Fans</p>
                             <p  onClick={()=>Allitems('RoomHeaters')} >Room Heaters</p>
                             <p  onClick={()=>Allitems('WaterHeaters&Geysers')} >WaterHeaters & Geysers</p>
                             <p  onClick={()=>Allitems('LaundryOrganization')} >Laundry Organization</p>
                             <p  onClick={()=>Allitems('AirPurifiers')} >Air Purifiers</p>
                             <p  onClick={()=>Allitems('Humidifiers')} >Humidifiers</p> 
                        </div>
                </div>
            </div>
            <div   className='ctg-flex' >
                <img src={computer} className="header-img" alt='Laptop'></img>
                <div className="dropdown">
                    <p className="dropbtn">Computer Accesories<ArrowDropDownOutlinedIcon fontSize='14px' /></p>
                         <div className="dropdown-content top">
                            <p  onClick={()=>Allitems('Audio&VideoAccessories')} >Audio & Video Accessories</p>
                             <p onClick={()=>Allitems('Cables&Accessories')} >Cables & Accessories</p>
                             <p  onClick={()=>Allitems('Keyboards,Mice&InputDevices')} >Keyboards,Mice and InputDevices</p>
                             <p  onClick={()=>Allitems('LaptopAccessories')} >Laptop Accessories</p>
                             <p  onClick={()=>Allitems('PCGamingPeripherals')} >PC Gaming Peripherals</p>
                             <p  onClick={()=>Allitems('Components')} >Components</p> 
                             <p  onClick={()=>Allitems('ExternalDevices&DataStorage')} >External Devices & DataStorage</p> 
                             <p  onClick={()=>Allitems('NetworkingDevices')} >Networking Devices</p> 
                             <p  onClick={()=>Allitems('Printers,Inks&Accessories')} >Printers,Inks & Accessories</p> 
                             <p  onClick={()=>Allitems('USBGadgets')} >USB Gadgets</p> 
                             <p  onClick={()=>Allitems('USBHubs')} >USB Hubs</p> 
                             <p  onClick={()=>Allitems('HardDiskBags')} >HardDisk Bags</p> 
                             <p  onClick={()=>Allitems('InternalSolidStateDrives')} >Internal Solid State Drives</p> 
                        </div>
                </div>
            </div>
            <div className='ctg-flex'>
                <img src={officeimg} className="header-img" alt='Office product' ></img>
                <div className="dropdown" style={{float:"right"}}>
                    <p className="dropbtn">Office Products<ArrowDropDownOutlinedIcon fontSize='14px' /></p>
                         <div className="dropdown-content_last top">
                            <p  onClick={()=>Allitems('Calculators')} >Calculators</p>
                             <p onClick={()=>Allitems('Notebooks,WritingPads&Diaries')} >Notebooks,Writing Pads & Diaries</p>
                             <p  onClick={()=>Allitems('Pens,Pencils&WritingSupplies')} >Pens,Pencils & WritingSupplies</p>
                             <p  onClick={()=>Allitems('ColouringPens&Markers')} >Colouring Pens & Markers</p>
                             <p  onClick={()=>Allitems('Copy&PrintingPape')} >Copy & PrintingPape</p>
                        </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default HeaderCategory