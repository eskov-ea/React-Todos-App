import React from 'react';
import ReactLoading from 'react-loading';

export const Preloader = () => {
    return <div style= {{display: "flex", justifyContent: "center"}}>
        <ReactLoading type="spin" color="#3b4ded" height={'10%'} width={'10%'} />
    </div>
}