import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import dateFormat from "dateformat";
import convertRupiah from "rupiah-format";

import Navbar from "../components/Navbar";
import CompleteOrder from "../components/modal/CompleteOrder"

import imgWaysBucks from "../assets/waysbucks.png";

import { UserContext } from "../context/userContext";

import imgBlank from "../assets/blank-profile.png";

import { API } from "../config/api";

export default function Profile() {
  let history = useHistory();

  const title = "Profile";
  document.title = "DumbMerch | " + title;

  const [state] = useContext(UserContext);
  const [idComplete, setIdComplete] = useState(null);
  const [completeOrder, setCompleteOrder] = useState(null);
  const [profile, setProfile] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProfile = async (id) => {
    try {
      const response = await API.get("/profile/" + state.user.id);
      setProfile(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await API.get("/transaction/" + state.user.id);
      setTransactions(response.data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getTransactions();
  }, []);

  console.log(transactions);

  const handleUpdate = () => {
    history.push("/update-profile/" + state.user.id);
  }

  const handleComplete = (id) => {
    setIdComplete(id);
    handleShow();
  };

  const completeById = async (id) => {
    try {
      const completed = "Completed"
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        status: completed
      }
      const body = JSON.stringify(data);
      await API.patch(`/transaction/${id}`, body, config);
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (completeOrder) {
      handleClose();
      completeById(idComplete);
      setCompleteOrder(null);
    }
  }, [completeOrder]);

  const StatusComp = (props) => {
    return (
      <div>
        {
          (() => {
            if (props.status == "Incomplete") {
              return (
                <>
                  <Link to="/cart" style={{ textDecoration: "none" }}>
                    <button type="button" className="btn btn-secondary btn-sm my-2">Incomplete</button>
                  </Link>
                </>
              )
            } else if (props.status == "Waiting") {
              return (
                <>
                  <button type="button" className="btn btn-warning btn-sm my-2" disabled>Waiting</button>
                </>
              )
            } else if (props.status == "Completed") {
              return (
                <>
                  <button type="button" className="btn btn-success btn-sm my-2" disabled>Completed</button>
                </>
              )
            } else if (props.status == "Delivering") {
              return (
                <>
                  <button onClick={() => { handleComplete(props.id) }} type="button" className="btn btn-info btn-sm my-2">Delivering</button>
                </>
              )
            } else {
              return (
                <>
                  <button type="button" className="btn btn-danger btn-sm my-2" disabled>Canceled</button>
                </>
              )
            }
          })()
        }
      </div>
    )
  };

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row>
          <Col md="6">
            <div className="h1 mb-4 text-red fw-9">My Profile</div>
            <Row>
              <Col md="6">
                <img src={profile?.image ? profile.image : imgBlank} className="img-fluid rounded" alt="avatar" />
              </Col>
              <Col md="6">
                <div className="fs-4 text-red fw-9">Name</div>
                <div className="text-brown mb-3">{profile.name}</div>
                <div className="fs-4 text-red fw-9">Email</div>
                <div className="text-brown mb-3">{profile.email}</div>
                <div className="mt-4">
                  <button className="form-control btn btn-info btn-sm" onClick={handleUpdate}>
                    Update Profile
                  </button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="h3 text-choco fw-9 mb-4">My Transaction</div>
            {transactions.length !== 0 ? (
              <>
                <div className="overflow-auto" style={{ height: "65vh" }}>
                  {transactions?.map((item, index) => (
                    <div key={index} className="card mb-3 no-border bg-pink p-3">
                      <div className="row">
                        <div className="col-9">
                          <div className="card bg-pink no-border mb-3">
                            <div class="row g-0">
                              <div class="col-4">
                                <img src={item.beverages.image} alt="img" class="img-fluid card" />
                              </div>
                              <div class="col-8 ps-2">
                                <p className="card-title text-red fw-9 fs-18">{item.beverages.name}</p>
                                <p className="card-text text-red fw-9 fs-14">{dateFormat(item.createdAt, "dddd, d mmmm yyyy")}</p>
                                <p className="card-text text-red fw-9 fs-14"><strong>Topping:</strong> {item.toppings.name}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="row py-2 text-center">
                            <div className="col">
                              <img src={imgWaysBucks} alt="logo" className="img-fluid" />
                              <StatusComp status={item.status} id={item.id} />
                              <p className="card-text text-brown fw-9 fs-14"><strong>Total Price:</strong> <br />{convertRupiah.convert(item.price)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="no-data-transaction">No transaction</div>
            )}
          </Col>
        </Row>
      </Container>
      <CompleteOrder setCompleteOrder={setCompleteOrder} show={show} handleClose={handleClose} />

    </>
  );
}
