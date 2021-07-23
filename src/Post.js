import { Avatar } from '@material-ui/core';
import { ArrowDownwardOutlined, ArrowUpwardOutlined, ChatBubbleOutlineOutlined, MoreHorizOutlined, RepeatOneOutlined, ShareOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionId, selectQuestionName, setQuestionInfo } from './features/questionSlice';
import { selectUser } from './features/userSlice';
import db from './firebase';
import './Post.css'
import firebase from "firebase";

Modal.setAppElement("#root");

function Post({key, Id, image, question, timestamp, quoraUser}){
    const [openModal, setOpenModal] = useState(false);
    const [answer, setAnswer] = useState("");
    const [getAnswer,setGetAnswer] =  useState([]);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const questionId = useSelector(selectQuestionId);
    const questionName = useSelector(selectQuestionName);
    const handleAnswer = (e) => {
        e.preventDefault();
        if(questionId){
            db.collection('questions').doc(questionId).collection('answer')
            .add({
                questionId: questionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                answer: answer,
                user: user,
            })
            console.log(questionId, questionName)
            setAnswer("")
            setOpenModal(false)
        }
    }

    useEffect(() => {
        if (questionId){
            db.collection('questions').doc(questionId).collection('answer').orderBy("timestamp","desc")
            .onSnapshot((snapshot => 
                setGetAnswer(
                    snapshot.docs.map((doc) => 
                    ({id: doc.id, answers: doc.data()})) 
                )))
        }
    }, [questionId])

    return(
        <div className="post"
        onClick={() => dispatch(setQuestionInfo({
            questionId: Id,
            questionName: question,
        }))}>

            <div className="post_Info">
                <Avatar src={quoraUser.photo}/>
                <h5>{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>

            <div className="post_Body">
                <div className="post_Question">
                    <p>{question}</p>
                    <button className="post_BtnAnswer" onClick={() => setOpenModal(true)}>답변하기</button>
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
                        <div className="modal_Question">
                            <h1>{question}</h1>
                            <p>
                                <span className="name">{quoraUser.displayName ? quoraUser.displayName : quoraUser.email}</span>
                                로부터의 질문
                                <span className="time">{new Date(timestamp?.toDate()).toLocaleString()}</span>
                                에 작성됨
                            </p>
                        </div>
                        <div className="modal_Answer">
                            <textarea placeholder="답변을 작성해 주세요"type ="text" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                        </div>
                        <div className="modal_Buttons">
                            <button type="submit" className="add" onClick={handleAnswer}>답변 달기</button>
                            <button onClick={() => setOpenModal(false)} className="can">닫기</button>
                        </div>
                        
                    </Modal>
                </div>
                <div className="post_Answer">
                    {
                        getAnswer.map(({id, answers}) => (
                            <p key= {id} style={{position:"relative", paddingBottom:"5px"}}>
                                {Id === answers.questionId ? (
                                    <span>{answers.answer}
                                    <br/>
                                    <span style={{
                                        position:"absolute",
                                        color: "yellowgreen",
                                        fontSize: "small",
                                        display: "flex",
                                        right: "0px"
                                    }}><span style={{color: "#b92b27"}}>
                                        {answers.user.dispalyName ? answers.user.displayName : answers.user.email}
                                    </span>{"\t"} {new Date(answers.timestamp?.toDate()).toLocaleString()} 에 작성됨
                                    </span>
                                    </span> ) : ("")
                                }
                            </p>
                        ))
                    }
                </div>
                
                <img src={image} alt=""/>
            </div>

            <div className="post_Footer">
                <div className="post_FooterAction">
                    <ArrowUpwardOutlined/>
                    <ArrowDownwardOutlined/>
                </div>
                <RepeatOneOutlined/>
                <ChatBubbleOutlineOutlined/>
                <div className="post_FooterRight">
                    <ShareOutlined/>
                    <MoreHorizOutlined/>
                </div>
            </div>
        </div>

    );
}

export default Post;