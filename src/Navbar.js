import { Avatar, Button, Input } from '@material-ui/core';
import { AssignmentIndOutlined, Home, NotificationsOutlined, PeopleAltOutlined, BorderAllRounded, Search, Language, ExpandMore, Link } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import './Navbar.css'
import Modal from 'react-modal';
import firebase from "firebase";


function Navbar() {
    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);
    const [input,setInput] = useState("");
    const [inputUrl,setInputUrl] = useState("");
    const handleQuestion = (e) => {
        e.preventDefault();
        setOpenModal(false)
        db.collection("questions").add({
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user,
        });
        setInput("");
        setInputUrl("");
    }

    return(
        <div className="navbar">


            <div className="qHeader_logo">
                <img src="data:image/png;base64,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" alt=""/>
            </div>


            <div className="qHeader_icons">


                <div className="qHeader_icon">
                    <Home/>
                </div>
                <div className="qHeader_icon">
                    <BorderAllRounded/>
                </div>
                <div className="qHeader_icon">
                    <AssignmentIndOutlined/>
                </div>
                <div className="qHeader_icon">
                    <PeopleAltOutlined/>
                </div>
                <div className="qHeader_icon">
                    <NotificationsOutlined/>
                </div>

            </div>

            <div className="qHeader_input">
                <input type="text" placeholder="검색하기"/>
                <Search/>
            </div>

            <div className="qHeader_Rem">
                <div className="qHeader_avatar">
                    <Avatar src={user.photo} onClick={() => auth.signOut()}/>
                </div>
                    <Language/>
                    <Button onClick={() => setOpenModal(true)}>질문하기</Button>
                    <Modal isOpen= {openModal} onRequestClose = {() => setOpenModal(false)} shouldCloseOnOverlayClick={false}
                    style={{
                        overlay:{
                            width: 700,
                            height: 600,
                            backgroundColor: "rgb(0,0,0,0.8)",
                            zIndex: "1000",
                            top: "50%",
                            left: "50%",
                            marginTop: "-300px",
                            marginLeft: "-350px",
                        }
                    }}>
                        <div className="modal_Title">
                            <h5>질문</h5>
                            <h5>공유하기</h5>
                        </div>
                        <div className="modal_Info">
                            <Avatar src={user.photo}/>
                            <p>질문자 : {user.displayName ? user.displayName : user.email}</p>
                            <div className="modal_Scope">
                                <PeopleAltOutlined/>
                                <p>전체공개</p>
                                <ExpandMore/>
                            </div>
                        </div>
                        <div className="modal_Field">
                            <Input type="text" placeholder="6하원칙으로 질문을 작성해 주세요" 
                            required value = {input} onChange={(e) => setInput(e.target.value)}/>
                            <div className="modal_FieldLink">
                                <Link/>
                                <Input type="text" placeholder="URL 링크만 작성해주세요"
                                value = {inputUrl} onChange={(e) => setInputUrl(e.target.value)}/>
                            </div>
                        </div>
                        <div className="modal_Buttons">
                            <button type="text" className="add" onClick={handleQuestion}>질문하기</button>
                            <button onClick={() => setOpenModal(false)} className="can">닫기</button>
                        </div>
                        
                    </Modal>
                
            </div>


        </div>
    );
}

export default Navbar;