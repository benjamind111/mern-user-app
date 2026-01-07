import PropTypes from "prop-types";
function PropFunction(props){
        // console.log('name',props.name)
    return(
        <div>
            <h1>this is my name {props.name} and my age is {props.age} my fav character is {props.heroname} - {props.isTrue ? 'yes':'no'} </h1>
        </div>
    )
}
PropFunction.propTypes={
    name:PropTypes.string,
    age:PropTypes.number,
    heroname:PropTypes.string,
    isTrue:PropTypes.bool,
}

export default PropFunction;