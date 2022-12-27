import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'




const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    // eslint-disable-next-line
    const { udata, setUdata } = useContext(adddata);
    // eslint-disable-next-line
    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {
        
        const res = await fetch("/getusers", {
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
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  add data succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                <h1>DATA MAHASISWA</h1>
                    <div className="add_btn mt-2 mb-2">
                       
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">ID</th>
                                <th scope="col">NPM</th>
                                <th scope="col">NAMA</th>
                                <th scope="col">KELAS</th>
                                <th scope="col">UTS</th>
                                <th scope="col">UAS</th>
                                <th scope="col">OPTION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.npm}</td>
                                                <td>{element.nama}</td>
                                                <td>{element.kelas}</td>
                                                <td>{element.uts}</td>
                                                <td>{element.uas}</td>
                                               
                                                <td className="d-flex justify-content-between">

                                                    <NavLink to={`edit/${element.id}`}>  <button className="btn btn-primary">EDIT</button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element.id)}>DELETE</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    )
}

export default Home

















