import React from 'react';
import notfound from '../../../images/404-notfound.jpg'

const NotFound = () => {
    return (
        <div>
            <img  className='img-fluid w-80 h-80'  src={notfound} alt="" />
        </div>
    );
};

export default NotFound;