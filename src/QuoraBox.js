import { Avatar } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import './QuoraBox.css'

function QuoraBox(){
    const user = useSelector(selectUser);
    return(
        <div className="quoraBox">
            <div className="quoraBox_Info">
                <Avatar src={user.photo}/>
                <h5>{user.displayName ? user.displayName : user.email}</h5>
            </div>
            <div className="quoraBox_Quora">
                <p>무엇이 궁금하신가요? {"\n\n"}자유롭게 질문을 작성해주세요.</p>
            </div>
        </div>
    );
}

export default QuoraBox;