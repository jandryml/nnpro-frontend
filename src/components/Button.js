import PropTypes from "prop-types";

const Button = ({color, text, onClick}) => {

    return (
        <div>
            <button
                onClick={onClick}
                style={{backgroundColor: color}}
                className="btn btn-block"
            >
                {text}
            </button>
        </div>
    );
};

Button.defaultProps = {
    color: "steelblue",
};

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
};

export default Button;
