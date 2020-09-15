import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const TimeLine = ({ data }) => {
  return (
    <>
      <div>
        <ul className="timeline">
          {data &&
            data.map((item, i) => (
              <li>
                <h6>{item.title}</h6>
                <p>{item.date && moment(item.date).format('MM ddd, YYYY')}</p>

                <p>{item.desc}</p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default connect((state) => ({}), {})(TimeLine);
