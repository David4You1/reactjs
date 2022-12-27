import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {
    // eslint-disable-next-line
   const {updata, setUPdata} = useContext(updatedata)
    // eslint-disable-next-line
    const history = useHistory("");

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


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/induser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setInpval(data[0])
            console.log("get data");

        }
    }
   
    useEffect(() => {

        getdata();  // eslint-disable-next-line
    }, []); 


    const updateuser = async(e)=>{
        e.preventDefault();

        const {npm, nama, kelas, uts, uas} = inpval;

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                npm, nama, kelas, uts, uas
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
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
                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                    <NavLink to={"/"} class="btn btn-primary">Back</NavLink>
                    </div>
               
                </div>
            </form>
        </div>
    )
}

export default Edit;





