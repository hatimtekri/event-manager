import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import "./LoginPage.css";
import Logo from '../assets/Logo.png'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useParams, useHistory } from "react-router-dom";
import withReactContent from 'sweetalert2-react-content'
import { Oval } from 'react-loader-spinner'
const LoginPage = () => {
    const [errorMessage, setErrorMessage] = useState('Tfdsjflkdsfj sdkfljsdlfk kljddfs  kljklsdfj lskdfjklsj est');
    const [itsId, setItsId] = useState('');
    const [password, setPassword] = useState('');
    const [Loading, setLoading] = useState(false);

    const history = useHistory();


    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })

    const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1224px)' })


    useEffect(() => {
        localStorage.removeItem("token");
    }, [])

    const login = () => {

        setLoading(true);
        // if(itsId == 30364495)
        // {
            localStorage.setItem("itsId",itsId);

            LoginApi();

        // }
        // else{
        //     DisplayMessage("Event Completed");

        // }


        //swal ( "Oops" ,  "Something went wrong!" ,  "error" );

        //swal("Hello world!");
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

    const LoginApi = async () => {
        const api = "https://mahadalzahra.org/api/loginauthentication/getHUffazBarnamajloginauthentication";
        //const api = "http://localhost:55453/api/loginauthentication/getHUffazBarnamajloginauthentication";







        const data = {
            ItsId: itsId,
            Password: password,


        };

        console.log(JSON.stringify(data));

        // axios.post(api,data,{headers:headers}).then((response) => {
        //     //response.data[0]
        //     DisplayMessage(JSON.stringify(response.data[0]))
        //   })
        //   .catch((error) => {
        //     DisplayMessage(JSON.stringify(error))

        //   });


        var myHeaders = new Headers();
        myHeaders.append("requestfromangular", "yes");
        myHeaders.append("firstrequest", "yes");
        myHeaders.append("Content-Type", "application/json");

        //var raw = "{\r\n   ItsId: '50419359',\r\n   Password: '2889', \r\n}";

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
            redirect: 'follow'
        };

        // fetch(api, requestOptions)
        //   .then(response => response.text())
        //   .then(result =>
        //     {
        //         console.log("1");
        //     DisplayMessage(JSON.stringify(result))
        //     })

        //   .catch(error =>
        //     {
        //         console.log("2");
        //     DisplayMessage(error.message)

        //     });

        const response = await fetch(api, requestOptions);
        if (response.status >= 200 && response.status <= 299) {
            const jsonResponse = await response.json();
            //console.log(jsonResponse);
            // DisplayMessage(JSON.stringify(jsonResponse))
            setLoading(false);
            localStorage.setItem("token", jsonResponse);
            history.push("/huffazBarnamaj1443/Registration");
        } else {
            // Handle errors
            setLoading(false);
            const jsonResponse = await response.json();
            //console.log(JSON.stringify(jsonResponse));
            DisplayMessage(jsonResponse.message)
        }


    }

    return (
        <>

            {isDesktopOrLaptop &&
                <div className='MainBackground_D' >

                    {Loading &&
                        <div className='loader'>
                            <Oval color="#F1D1A4" height={80} width={80} />
                        </div>
                    }


                    <div className='LoginBox_D' >
                        <img className='LoginLogo' src={Logo} ></img>



                        <input className='LoginInputs1' onKeyPress={(e) => e.key === 'Enter' && login()} onChange={(e) => setItsId(e.target.value)} type="number" placeholder='Enter ITS ID'></input>
                        <input className='LoginInputs2' onKeyPress={(e) => e.key === 'Enter' && login()}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password'></input>
                          <label className='LoginLabel1'>Event Completed</label> 
                        {/* <label className='LoginLabel2'><strong style={{fontSize:"15px"}} > +919106618607, +919033221851</strong></label>  */}
                         {/* <button onClick={login} className='LoginButton' >Login</button>  */}
                    </div>
                    <div className='footerLogin' >
                        
                        

                    </div>

                </div>
            }

            {isTabletOrMobile &&

                <div className='MainBackground' >
                    {Loading &&
                        <div className='loader'>
                            <Oval color="#F1D1A4" height={80} width={80} />
                        </div>
                    }



                    <div className='LoginBox' >
                        <img className='LoginLogo' src={Logo} ></img>



                        <input className='LoginInputs1' onKeyPress={(e) => e.key === 'Enter' && login()} onChange={(e) => setItsId(e.target.value)} type="number" placeholder='Enter ITS ID'></input>
                        <input className='LoginInputs2' onKeyPress={(e) => e.key === 'Enter' && login()} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password'></input>
                         <label className='LoginLabel1'>Event Completed</label> 
                         {/* <label className='LoginLabel2'><strong style={{fontSize:"15px"}} > +919106618607, +919033221851</strong></label>  */}
                         
                         {/* <button onClick={login} className='LoginButton' >Login</button>  */}
                    </div>


                </div>
            }
        </>
    )
}

export default LoginPage