import React, {Component, useState} from 'react';
import img1 from "../assets/img1.jpg"
// import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {Modal} from './Modal'
import './style.css'


const Card = (props) =>{
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    };

    return(
        <>
            <div className="card text-center">
                <div className="overflow">
                    <img src={img1} alt="Image 1" className="card-img-top"/>
                </div>
                <div className="card-body text-dark">
                    <h4 className="card-title"> {props.title} </h4>
                    <p className="card-text text-secondary"> some random staff </p>
                    <Button variant="outline-success">Purchase</Button>
                    <Button onClick={openModal} variant="outline-success" className="infobtn">info</Button>
                    <Modal title={props.title} showModal={showModal} setShowModal={setShowModal}/>
                </div>
            </div>
        </>
    )
}

export default Card;