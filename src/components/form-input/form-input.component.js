import React from 'react';

import './form-input.styles.scss';

const FormInput = ({OnChange, label,value, ...OtherProps}) => (
    <div className='group'>
        <input className='form-input'  {...OtherProps} onChange={OnChange} />
        {label ? 
        (<label className={`${value.length} ? 'shrink' : '' } form-input-label` }
        >
        {label}
        </label>
        ) : null} 
    </div>
);

export default FormInput;
