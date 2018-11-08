// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';

// const Avatars = () => (
//   <div style={styles.row}>
//     <Avatar 
//       alt="Remy Sharp" 
//       src="/static/images/remy.jpg" 
//       style={styles.avatar} 
//     />
//   </div>
// )


ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'left',
  },
  avatar: {
    margin: 10,
    height: 60,
    width: 60
  }
};

export default withStyles(styles)(Avatars);