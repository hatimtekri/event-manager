
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import "./RegistrationPage.css";
import Logo from '../assets/Logo.png'
import passdesign_red from '../assets/passdesign_red.png'

import axios from 'axios';
import Swal from 'sweetalert2'
import { useParams, useHistory } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import { Oval } from 'react-loader-spinner'

const RegistrationPage = () => {


  const [attendance, setAttendance] = useState('true');
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [resStatus, setResStatus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [gender, setGender] = useState("");
  const [passData, setPassData] = useState({});
  const [isPass, setIsPass] = useState(false);

  const [Loading, setLoading] = useState(false);


  const history = useHistory();
  useEffect(() => {
    //setLoading(true);
    //callApi();
    setData({itsId:localStorage.getItem("itsId")});

  }, []);

  const callApi = async () => {
    const api = "https://mahadalzahra.org/api/huffaz/zyafat/its_new";

    var myHeaders = new Headers();
    myHeaders.append("requestfromangular", "yes");
    myHeaders.append("firstrequest", "no");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));


    //var raw = "{\r\n   ItsId: '50419359',\r\n   Password: '2889', \r\n}";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };
    const response = await fetch(api, requestOptions);
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      //console.log(JSON.stringify(jsonResponse));
      setData(jsonResponse.user);
      setLoaded(true);
      setLoading(false);
      setResStatus(jsonResponse.regStatus);
      setGender(jsonResponse.gender);
      setPassData(jsonResponse.pass);
      setIsPass(jsonResponse.isPass);
      if (jsonResponse.regStatus == true) {
        console.log(jsonResponse.attendance);
        setAttendance(jsonResponse.attendance == true ? "true" : "false");
      }

      //  DisplayMessage(JSON.stringify(jsonResponse))
      //localStorage.setItem("token",jsonResponse);
    } else {
      // Handle errors
      setLoading(false);
      const jsonResponse = await response.json();
      //console.log(JSON.stringify(jsonResponse));
      DisplayMessage(jsonResponse.message)
    }

  }

  const DisplayMessage = (message) => {
    const MySwal = withReactContent(Swal)

    MySwal.fire({
      title: <p>Hello World</p>,
      footer: 'Copyright 2018',
      didOpen: () => {
        // `MySwal` is a subclass of `Swal`
        //   with all the same instance & static methods
        MySwal.clickConfirm()
      }
    }).then(() => {
      return MySwal.fire(<p>{message}</p>)
    })
  }
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })

  const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1224px)' })


  const SubmitApi = async () => {
    setLoading(true);
    const api = "https://mahadalzahra.org/api/huffazZyafat/add/registration_New";
    //const api = "http://localhost:55453/api/huffazZyafat/add/registration_New";







    const data1 = {
      ItsId: data.itsId,
      Accomodation: attendance,
    };

    console.log(JSON.stringify(data1));


    var myHeaders = new Headers();
    myHeaders.append("requestfromangular", "yes");
    myHeaders.append("firstrequest", "no");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data1),
      redirect: 'follow'
    };



    const response = await fetch(api, requestOptions);
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      setLoading(false);
      setEdit(false);
      if (jsonResponse == "New") {
        DisplayMessage("Registered Successfully");

      }
      else if (jsonResponse == "Old") {
        DisplayMessage("Saved Successfully");

      }


    } else {
      // Handle errors
      setLoading(false);
      const jsonResponse = await response.json();
      //console.log(JSON.stringify(jsonResponse));
      DisplayMessage(jsonResponse.message)
    }


  }
  const logout = () => {

    localStorage.removeItem("token");
    history.push("/huffazBarnamaj1443/Login");
  }

  const openGeneral=()=>
  {
    history.push("/huffazBarnamaj1443/GeneralPhotos");
  }

  const openGroup=()=>
  {
    
    history.push("/huffazBarnamaj1443/GroupPhotos");
  }

  return (
    <>

      {isDesktopOrLaptop &&

        <div className='MainBackground_r_d' >

          {Loading &&
            <div className='loader '>
              <Oval color="#F1D1A4" height={80} width={80} />
            </div>
          }

          <div className='header ' >
            {/* <hr className='upperBar'></hr>
<hr className='lowerBar'></hr> */}

          </div>
          <div className='RegistrationProfileBox_D ' >

            <img src={`https://mahadalzahra.org/uploads/Its_Photos/${data.itsId}.jpeg`} className="imageStyle" ></img>
            <button className='Registration_D'  >
              <>Registration</>
            </button>
            <button className='Logout_D' onClick={() => logout()} >
              <>Logout</>
            </button>

          </div>
          {/* <div className='RegistrationBox_D' >

            <div className='ReagiatrationHeading'>
              Registration
            </div>

            <hr className='divider'></hr>

            <input className='RegistrationInputs1_D' value={data.itsId} type="text" readOnly placeholder='ITS ID'></input>
            <input className='RegistrationInputs2_D' value={data.name} type="text" readOnly placeholder='Name'></input>
            <input className='RegistrationInputs3_D' value={data.arabic_FullName} type="text" readOnly placeholder='Arabic Name'></input>
            <input className='RegistrationInputs4_D' value={data.mobileNo} type="text" readOnly placeholder='Mobile Number'></input>
            <input className='RegistrationInputs5_D' value={data.emailId} type="text" readOnly placeholder='Email Address'></input>
            <label className='RegistrationInputs6label_D'>Will you attend the barnamaj? </label>
            
            {resStatus && !edit ? <></> : <>

              <div className='RegistrationInputs6_D'  >
                <input type="radio" value="true" onChange={(e) => { setAttendance(e.target.value) }} checked={attendance == "true"} name="attendence" /> Yes
                <input type="radio" value="false" onChange={(e) => { setAttendance(e.target.value) }} checked={attendance == "false"} name="attendence" /> No
              </div>
            </>}

            <div className='alreadyRegistered_d'>
              {resStatus && <>You have already selected {attendance == "true" ? "\"Yes\"" : "\"No\""} to attend the barnamaj.</>}
            </div>
            <div className="Instructions_D">
              <ol className="text-danger">
                <li>The huffaz barnamaj will TENTATIVELY be held between 25th and 28th of Rajab al-Asab1443H in Surat.</li>
                <li>If there are any changes in your contact details, kindly update them in your ITS profile.</li>
                <li>For further queries, kindly contact us at <strong> huffazbarnamaj1443@gmail.com. </strong> Don't forget to mention the hafiz's full name and ITS no with your query.</li>

              </ol>
              <br />

            </div>
            {resStatus && !edit ? <>
              <button className='LoginButton_D' onClick={() => { setEdit(true) }} >
                Edit
              </button>
            </>
              :
              <>
                <button className='LoginButton_D' onClick={() => { SubmitApi() }} >
                  {resStatus ? <>Save</> : <>Submit</>}
                </button>
              </>}

          </div> */}
          <div className='RegistrationBox_D' >

            <div className='ReagiatrationHeading'>
              Huffaz Barnamaj 1443H
            </div>

            <hr className='divider'></hr>
<div className='photosNavigation' >
<button onClick={()=>openGroup()} className='photobutton' >Group Photos</button>
<button onClick={()=>openGeneral()} className='photobutton' >General Photos</button>

</div>
            {/* {attendance && resStatus && passData.gate == "Golwad- G33" &&
              <div className="video">
                <iframe src="https://player.vimeo.com/video/682389960?h=698806e148&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" title="Huffaz Barnamaj" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
            } */}
            {/* {isPass &&
              <div className='pass'>
                <div className="sticker" >
                  <div className='HBText'>
                    HUFFAZ BARNAMAJ 1443H
                  </div>
                  <div className='suratText'>
                    SURAT
                  </div>

                  {passData.gate == "Moovers-G6" ?
                    <>
                      <div className='BlockText'>
                        BLOCK-{passData.blockName}
                      </div>
                      <div className='gateText'>
                        Entry: {passData.gate}
                      </div>

                    </>
                    :
                    <>
                      <div className='SeatText'>
                        {passData.rowName}-{passData.colunmName}
                      </div>
                      <div className='burhaniText'>
                        {passData.blockName}
                      </div>
                      <div className='gateText'>
                        Entry: {passData.gate}
                      </div>

                    </>}

                  <div className='nameText'>
                    {data.name}
                  </div>

                  <div className='itsIdText'>
                    {data.itsId}
                  </div>
                  <div className='design'>

                  </div>
                  <div className='logo'>

                  </div>
                </div>
              </div>
            } */}

           <div className="Instructions_D">
              <ol className="text-danger">
                <li>The event photographs will remain live till 4th March 2022.</li>
                <li>We request your patience as the photos may take some time to download since they are in high resolution.</li>   
                                
              </ol>
              <br />

            </div> 
            {/* <div className='alreadyRegistered_d'>


  {resStatus && <>You have already selected {attendance == "true" ? "\"Yes\"" : "\"No\""} to attend the barnamaj.</>}
</div> */}



          </div>
          <div className='footer ' >
            {/* <hr className='footerUpperBar'></hr> */}
            <small style={{ color: "#F4E3D3 ", fontSize: "15px" }} >Copyright © 2017 Mahad Al Zahra - Al Jamea Tus Saifiyah. All Rights Reserved.</small>

          </div>

        </div>
      }

      {isTabletOrMobile &&

        <div className='MainBackground_r' >

          {Loading &&
            <div className='loader'>
              <Oval color="#F1D1A4" height={80} width={80} />
            </div>
          }

          <div className='headerMobile' >


          </div>


          {/* <div className='RegistrationBox' >

            <div className='ReagiatrationHeading'>
              Registration &nbsp;&nbsp;&nbsp; <a className='logoutMobile' onClick={logout} >Logout</a>
            </div>

            <hr className='divider'></hr>

            <input className='RegistrationInputs1' value={data.itsId} type="text" readOnly placeholder='ITS ID'></input>
            <input className='RegistrationInputs2' value={data.name} type="text" readOnly placeholder='Name'></input>
            <input className='RegistrationInputs3' value={data.arabic_FullName} type="text" readOnly placeholder='Arabic Name'></input>
            <input className='RegistrationInputs4' value={data.mobileNo} type="text" readOnly placeholder='Mobile Number'></input>
            <input className='RegistrationInputs5' value={data.emailId} type="text" readOnly placeholder='Email Address'></input>
            <label className='RegistrationInputs6label'>Will you attend the barnamaj? </label>

            {resStatus && !edit ? <></> : <>

              <div className='RegistrationInputs6'  >
                <input type="radio" value="true" onChange={(e) => { setAttendance(e.target.value) }} checked={attendance == "true"} name="attendence" /> Yes
                <input type="radio" value="false" onChange={(e) => { setAttendance(e.target.value) }} checked={attendance == "false"} name="attendence" /> No
              </div>
            </>}

            <div className='alreadyRegistered'>
              {resStatus && <>You have already selected {attendance == "true" ? "\"Yes\"" : "\"No\""} to attend the barnamaj.</>}
            </div>

            <div className="Instructions">
              <ol className="text-danger">
                <li>The huffaz barnamaj will TENTATIVELY be held between 25th and 28th of Rajab al-Asab1443H in Surat.</li>
                <li>If there are any changes in your contact details, kindly update them in your ITS profile.</li>
                <li>For further queries, kindly contact us at <strong> huffazbarnamaj1443@gmail.com. </strong> Don't forget to mention the hafiz's full name and ITS no with your query.</li>
              </ol>
              <br />

            </div>
            {resStatus && !edit ? <>
              <button className='LoginButton' onClick={() => { setEdit(true) }} >
                Edit
              </button>
            </>
              :
              <>
                <button className='LoginButton' onClick={() => { SubmitApi() }} >
                  {resStatus ? <>Save</> : <>Submit</>}
                </button>
              </>}

          </div> */}
          <div className='RegistrationBox' >

            <div className='ReagiatrationHeading'>
              Huffaz Barnamaj 1443 &nbsp;&nbsp;&nbsp; <a className='logoutMobile' onClick={logout} >Logout</a>
            </div>

            <hr className='divider'></hr>
            <div className='photosNavigation' >
<button onClick={()=>openGroup()} className='photobutton' >Group Photos</button>
<button onClick={()=>openGeneral()} className='photobutton' >General Photos</button>

</div>
            {/* {attendance && resStatus && passData.gate == "Golwad- G33" &&
              <div className="videoMobile">
                <iframe src="https://player.vimeo.com/video/682389960?h=698806e148&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" title="Huffaz Barnamaj" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
              </div>
            }
            {isPass &&
              <div className='passMobile'>
                <div className="stickerMobile" >
                  <div className='HBTextMobile'>
                    HUFFAZ BARNAMAJ 1443H
                  </div>
                  <div className='suratTextMobile'>
                    SURAT
                  </div>
                  {passData.gate == "Moovers-G6" ?
                    <>
                      <div className='BlockTextMobile'>
                        BLOCK-{passData.blockName}
                      </div>
                      <div className='gateTextMobile'>
                        Entry: {passData.gate}
                      </div>


                    </>
                    :
                    <>
                      <div className='SeatTextMobile'>
                        {passData.rowName}-{passData.colunmName}
                      </div>
                      <div className='burhaniTextMobile'>
                        {passData.blockName}
                      </div>
                      <div className='gateTextMobile'>
                        Entry: {passData.gate}
                      </div>

                    </>}

                  <div className='nameTextMobile'>
                    {data.name}
                  </div>

                  <div className='itsIdTextMobile'>
                    {data.itsId}
                  </div>
                  <div className='designMobile'>

                  </div>
                  <div className='logoMobile'>

                  </div>
                </div>
              </div>
            } */}

          </div>
           <div className="Instructions">
              <ol className="text-danger">
              <li>The event photographs will remain live till 4th March 2022.</li>
                <li>We request your patience as the photos may take some time to download since they are in high resolution.</li>   
                
              </ol>
              <br />

            </div> 
          
          <div className='footerMobile' >
            {/* <hr className='footerUpperBar'></hr> */}
            <small style={{ color: "#F4E3D3 ", fontSize: "10px" }} >Copyright © 2017 Mahad Al Zahra - Al Jamea Tus Saifiyah. All Rights Reserved.</small>

          </div>

        </div>
      }
    </>
  );
}

export default RegistrationPage