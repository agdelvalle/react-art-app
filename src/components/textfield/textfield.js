import './textfield.css'
import PropTypes from "prop-types"

export const TextField = ({...props}) => {
    return <div className='textfield-container'>
    <label htmlFor={props.name} className="input-label">{props.labeltext}</label>
    <input type={props.type} name={props.name} value={props.value} onChange={props.onChange}></input>
    </div>
}

TextField.propTypes = {
    onChange: PropTypes.func,
    labelText: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
}