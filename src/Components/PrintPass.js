
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Oval } from 'react-loader-spinner'
import { useParams, useHistory } from "react-router-dom";
import "./PrintPass.css";


const PrintPass = () => {


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
    setLoading(true);
    callApi();

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
    window.print();
    
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

    return (
        <div>
         {Loading &&
            <div className='loader '>
              <Oval color="#F1D1A4" height={80} width={80} />
            </div>
          }
            <div className='passNew'>
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
        </div>
    )
}

export default PrintPass