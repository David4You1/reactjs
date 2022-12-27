import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {
 // eslint-disable-next-line
    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setInpval] = useState({
        npm: '',
        nama: '',
        kelas: '',
        uts: '',
        uas: '',
      });

   const setdata = (event) => {
    setInpval({
      ...inpval,
      [event.target.name]: event.target.value
    });
  }


    const addinpdata = async (e) => {
        e.preventDefault();

        const { npm, nama, kelas, uts, uas} = inpval;


        if (npm === "") {
            alert("npm is required")
        } else if (nama === "") {
            alert("nama is required")
        } else if (kelas === "") {
            alert("kelas is required")
        } else if (uts === "") {
            alert("uts is required")
        } else if (uas === "") {
            alert("uas is required")
        
        } else {

            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    npm, nama, kelas, uts, uas 
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/")
                setUdata(data)
                console.log("data added");

            }
        }

    }

    return (
        <div className="container">
            <form className="mt-4">
                <div className="row">
              
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">NPM</label>
                        <input type="number" value={inpval.npm} onChange={setdata} name="npm" class="form-control" autocomplete="off"/>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">NAMA</label>
                        <input type="text" value={inpval.nama} onChange={setdata} name="nama" class="form-control" autocomplete="off"/>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">KELAS</label>
                        <input type="text" value={inpval.kelas} onChange={setdata} name="kelas" class="form-control" autocomplete="off"/>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">UTS</label>
                        <input type="number" value={inpval.uts} onChange={setdata} name="uts" class="form-control" autocomplete="off"/>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label class="form-label">UAS</label>
                        <input type="number" value={inpval.uas} onChange={setdata} name="uas" class="form-control" autocomplete="off"/>
                    </div>
                   
                   
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                    <NavLink to={"/"} class="btn btn-primary">Back</NavLink>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Register;
