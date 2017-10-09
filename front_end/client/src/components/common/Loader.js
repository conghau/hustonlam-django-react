import React, {PropTypes} from 'react';
import '../../../node_modules/semantic-ui-loader/loader.min.css';
import './assets/loader.scss';

class Loader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let $class = '';
        let $inverted = '';
        let $overlay = '';
        if(this.props.overlay &&
            this.props.overlay === true) {
            $overlay = $overlay.concat(' overlay ');
        }
        if(this.props.text) {
            $class = $class.concat(' text ');
        }
        if(this.props.states &&
            this.props.states === true) {
            $class = $class.concat(' indeterminate ');
        }
        // Size: mini, tiny, small, medium, large
        if(this.props.size) {
            $class = $class.concat(` ${this.props.size} `);
        }
        if(this.props.inverterd &&
            this.props.inverterd === true) {
            $inverted = $inverted.concat(' inverted ');
        }

        return(
            <div className={$overlay}>
                <div className="ui segment">
                    <div className={`ui active ${$inverted} dimmer`}>
                        {this.props.text ?
                            (<div className={`ui ${$class} loader`}>{this.props.text}</div>) :
                            (<div className={`ui ${$class} loader`}></div>)
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Loader.propTypes = {
    overlay: PropTypes.bool,
    text: PropTypes.string,
    states: PropTypes.bool,
    size: PropTypes.string,
    inverted: PropTypes.bool
};

export default Loader;