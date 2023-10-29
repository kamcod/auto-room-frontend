import {useEffect, useState} from "react";
import axios from "axios";
import AppConfig from "../../utils/AppConfig";
import Pagination from 'react-bootstrap/Pagination';
import AddCarModal from "./AddCarModal";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState();
    const [registeredCars, setRegisteredCars] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationItems, setPaginationItems] = useState([]);
    const [carsData, setCarsData] = useState([]);
    const [editCarData, setEditCarData] = useState();
    const [showAddCarModal, setShowAddCarModal] = useState(false);
    const [duplicateLoading, setDuplicateLoading] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);

    const setPagination = (data) => {
        let items = [];
        let active = Number(data.currentPage);
        let totalPages = Number(data.totalPages);
        let currentPage = Number(data.currentPage);
        items.push(
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1}/>,
            <Pagination.Prev onClick={(e) => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}/>,
        );
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                items.push(
                    <Pagination.Item key={pageNumber} onClick={() => setCurrentPage(pageNumber)}
                                     active={pageNumber == active}>
                        {pageNumber}
                    </Pagination.Item>,
                );
            }
        items.push(
            <Pagination.Next onClick={(e)=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}/>,
            <Pagination.Last onClick={(e)=>setCurrentPage(totalPages)} disabled={currentPage === totalPages}/>
        );
        setPaginationItems([...items]);
    };

    const fetchDashboardData = () => {
        axios.get(`${AppConfig.apis.getDashboardStats}?page=${currentPage}`)
            .then(res => {
                if(res.status === 200) {
                    const {cars, name, pagination, totalCars} = res.data;
                    setRegisteredCars(Number(totalCars));
                    setCarsData(cars);
                    setPagination(pagination);
                    setUserName(name);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    const editCar = (id) => {
        axios.get(`${AppConfig.apis.cars}/${id}`)
            .then(res => {
                if(res.status === 200) {
                    setEditCarData(res.data.car);
                    setShowAddCarModal(true);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    };
    const deleteCar = (id) => {
        setDeleteLoading(`dload${id}`);
        axios.delete(`${AppConfig.apis.cars}/${id}`)
            .then(res => {
                if(res.status === 200) {
                    setDeleteLoading(null);
                    fetchDashboardData();
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    const duplicate = (id, category, registration_no, make, model, color ) => {
        setDuplicateLoading(`load${id}`);
        axios.post(AppConfig.apis.cars, {
            category, make, model: Number(model), color, registration_no
        })
            .then(res => {
                if(res.status === 201) {
                    setDuplicateLoading(null);
                    fetchDashboardData();
                }
            })
            .catch(err => {
                setDuplicateLoading(false);
                console.log("error", err);
            })
    }

    const viewByCategory = async (value) => {
        axios.get(`${AppConfig.apis.getDashboardStats}?page=${currentPage}`)
            .then(res => {
                if(res.status === 200) {
                    const {cars, pagination} = res.data;
                    let filteredData = cars.filter(i => i.category === value);
                    setCarsData(filteredData);
                    setPagination(pagination);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    useEffect(()=>{
       fetchDashboardData();
    }, [currentPage])
    return (
        <div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <div className="dashboard-title">
                    <h1>Welcome {userName}!</h1>
                </div>
                <div className="dashboard-card">
                    <p>Registered Cars: </p>
                    <p>{registeredCars < 10 ? `0${registeredCars}` : registeredCars}</p>
                </div>
            </div>

            <br /><br />
            <AddCarModal
                show={showAddCarModal}
                onHide={()=>{setEditCarData(null);setShowAddCarModal(false)}}
                refetchData={()=>fetchDashboardData()}
                editCarData={editCarData}
            />
            {carsData.length > 0 && <div className="table-top-bar">
                <button type="button" className="add-new-car-btn" onClick={() => setShowAddCarModal(true)}>Add New Car</button>
                <div className="d-flex justify-content-between gap-4 align-items-center">
                    <a href="#" style={{cursor: 'pointer'}} onClick={fetchDashboardData}>Clear Filter</a>
                    <Form.Select  style={{width: '250px'}} onChange={(e)=>viewByCategory(e.target.value)}>
                        <option>View By Category</option>
                        <option value="car">Car</option>
                        <option value="bus">Bus</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                    </Form.Select>
                </div>
            </div>}

            <div className="cars-table-wrapper">
                {carsData.length > 0 ? <table className="cars-table">
                    <thead>
                    <tr>
                    <th>Sr. No#</th>
                    <th>Category</th>
                    <th>Registeration No</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                {carsData?.map(({_id, id, category, registration_no, make, model, color }, index) => {
                    return <tr key={_id || id}>
                    <td style={{width: "100px"}}>{index+1}</td>
                    <td>{category}</td>
                    <td>{registration_no}</td>
                    <td>{make}</td>
                    <td>{model}</td>
                    <td>{color}</td>
                    <td>
                        <span><a href="#" style={{cursor: 'pointer'}} onClick={()=>editCar(_id || id)}>Edit</a></span>
                             {` || `}
                        <span><a href="#" style={{cursor: 'pointer'}} onClick={()=>deleteCar(_id || id)}>
                            {deleteLoading === `dload${_id || id}` ? <Spinner animation="border" size="sm" /> : 'Delete' }
                        </a></span>
                            {` || `}
                        <span><a href="#" style={{cursor: 'pointer'}} onClick={()=>duplicate(_id || id, category, registration_no, make, model, color)}>
                            {duplicateLoading === `load${_id || id}` ? <Spinner animation="border" size="sm" /> : 'Duplicate' }
                        </a></span>
                    </td>
                </tr>
                })}
                    </tbody>
                </table> : <div className="no-data">
                    You have not registered any car yet. <br/>
                    <button type="button" className="add-new-car-btn" onClick={() => setShowAddCarModal(true)}>Add New Car</button>
                </div>}
            </div>

            {carsData.length > 0 && <div className="pagination-wrapper">
                <Pagination size="sm">{paginationItems}</Pagination>
            </div>}

        </div>
    )
}
