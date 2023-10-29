import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import AppConfig from "../../utils/AppConfig";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useEffect, useState} from "react";

export default function AddCarModal(props){
    const {onHide, refetchData, editCarData} = props;
    const [category, setCategory] = useState();
    const [make, setMake] = useState();
    const [model, setModel] = useState();
    const [color, setColor] = useState();
    const [regNo, setRegNo] = useState();
    const [loadingBtn, setLoadingBtn] = useState(false);

    useEffect(()=>{
        if(editCarData){
            const {category, make, model, color, registration_no: regNo} = editCarData;
            setMake(make);
            setModel(model);
            setColor(color);
            setRegNo(regNo);
            setCategory(category);
        }
    },[editCarData])

    const submitCarData = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        if(editCarData) {
            axios.patch(`${AppConfig.apis.cars}/${editCarData._id || editCarData.id}`, {
                category, make, model: Number(model), color, registration_no: regNo
            })
                .then(res => {
                    if(res.status === 200){
                        setLoadingBtn(false);
                        refetchData();
                        onHide();
                        setMake('');
                        setModel('');
                        setColor('');
                        setRegNo('');
                    }
                })
                .catch(err => {
                    setLoadingBtn(false);
                    console.log("error", err);
                })
        } else {
            axios.post(AppConfig.apis.cars, {
                category, make, model: Number(model), color, registration_no: regNo
            })
                .then(res => {
                    if(res.status === 201) {
                        setLoadingBtn(false);
                        onHide();
                        refetchData();
                        setMake('');
                        setModel('');
                        setColor('');
                        setRegNo('');
                    }
                })
                .catch(err => {
                    setLoadingBtn(false);
                    console.log("error", err);
                })
        }
    };
    return(
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="add-note-modal"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {editCarData ? 'Edit Record' : 'Add New Car Data'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="add-car-form">
                    <form onSubmit={submitCarData}>
                        <Form.Select aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
                            <option>Select Category</option>
                            <option value="car">Car</option>
                            <option value="bus">Bus</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="hatchback">Hatchback</option>
                        </Form.Select>
                        <br />
                        <label>Make:</label> <br />
                        <input type="text" value={make} onChange={(e)=>setMake(e.target.value)} />
                        <br /><br />
                        <label>Model:</label><br />
                        <input type="text" value={model} onChange={(e)=>setModel(e.target.value)} />
                        <br /><br />
                        <label>Registeration No:</label><br />
                        <input type="text" value={regNo} onChange={(e)=>setRegNo(e.target.value)} />
                        <br /><br />
                        <label>Color:</label><br />
                        <input type="text" value={color} onChange={(e)=>setColor(e.target.value)} />
                        <br /><br /><br />
                        <Button className="blueBtn" style={{width: "100%"}} type="submit">
                            {loadingBtn && <><Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> loading...</>}
                            {!loadingBtn && 'Save'}
                            </Button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
