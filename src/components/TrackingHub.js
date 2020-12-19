import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrackingTable from './TrackingTable';

const numbers = [
  {
    number: '121',
    friend: 'jordan',
    giftInfo: [
      {
        id: 1,
        giftName: 'dildo',
        price: 20,
      },
    ],
  },
  {
    number: '222',
    friend: 'ohno',
    giftInfo: [
      {
        id: 2,
        giftName: 'dildo',
        price: 20,
      },
    ],
  },
];

class TrackingHub extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-holder">
        <TrackingTable numbers={numbers} />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    name: reduxState.user.name,
  };
}

export default connect(mapStateToProps, null)(TrackingHub);