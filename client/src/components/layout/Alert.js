import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// We desctrctured the alerts so we dont have to call them with props
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    // alert.alertType is to make the alert dynamic. It will change the BG
    // depending on if it's succes, danger, etc
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

// we want to get the alert State to this component.
//  inside we will call whatever we want to get from the root reducer (index).
// In this case, to get the state alert reducer we will call state.alert
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
