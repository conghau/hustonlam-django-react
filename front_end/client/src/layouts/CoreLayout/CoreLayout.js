import React from 'react';
import './CoreLayout.scss';
import '../../styles/core.scss';
import ReduxToastr from 'react-redux-toastr';

export const CoreLayout = ({ children }) => (
  <div>
    <ReduxToastr
        timeOut={3000}
        newestOnTop={true}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar={true}></ReduxToastr>
    {children}
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
