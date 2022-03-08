import React from 'react';

function Jumbotron() {
  return (
    <div>
      <div className="container">
        <div className="jumbotron mt-5 p-lg-3">
          <div className="row">
            <div className="col-xl-7 col-lg-6 col-md-6 col-sm-10">
              <p className="mx-3 mx-md-5 mx-sm-2 mt-5 text-white fw-9 fre-60">WAYSBUCKS</p>
              <p className="mx-3 mx-md-5 mx-sm-2 text-white fw-3 fs-24">Things are changing, but we're still there for you</p>
              <p className="mx-3 mx-md-5 mx-sm-2 mb-xl-5 mb-lg-3 text-white fw-3 fs-18">
                We have temporarily closed our in-store cafes, but selected
                groceries and drive-thru locations are remaining open.<br />
                <strong>Waysbucks</strong> Drivers are also available.
              </p>
              <p className="mx-3 mx-md-5 mx-sm-2 mb-5 text-white fw-3 fs-18">Let's Order...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;
