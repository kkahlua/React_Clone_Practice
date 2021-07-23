import { Add } from '@material-ui/icons';
import React from 'react';
import './SidebarOptions.css';

function SidebarOptions(){
    return(
        <div className="sidebarOptions">
            <div className="sidebarOption">
                <img src="https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_960_720.jpg" alt=""/>
                <p>야옹이</p>
            </div>
            <div className="sidebarOption">
                <img src="https://media.istockphoto.com/photos/corgi-puppy-sitting-down-picture-id1130502863?k=6&m=1130502863&s=612x612&w=0&h=uyEAAOFRhoTIIpR3U5jIJp89W3-iRs0ESXrhMZWGesk=" alt=""/>
                <p>멍멍이</p>
            </div>
            <div className="sidebarOption">
                <img src="https://cdn.pixabay.com/photo/2017/10/23/05/56/holiday-2880261__340.jpg" alt=""/>
                <p>여행</p>
            </div>
            <div className="sidebarOption">
                <img src="https://cdn.pixabay.com/photo/2016/10/28/11/57/tic-tac-toe-1777859__480.jpg" alt=""/>
                <p>게임</p>
            </div>
            <div className="sidebarOption">
                <img src="https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536__340.jpg" alt=""/>
                <p>코딩</p>
            </div>
            <div className="sidebarOption">
                <img src="https://cdn.pixabay.com/photo/2014/11/22/00/51/camera-541213__340.jpg" alt=""/>
                <p>사진</p>
            </div>
            <div className="sidebarOption">
                <Add/>
                <p className="text">더보기</p>
            </div>
        </div>
    );
}

export default SidebarOptions;