import React, { useContext, useEffect, useState } from "react";
import { FaLink, FaTimes } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const UserDetails = () => {
  const { url, user, getToken } = useContext(AppContext);
  //
  const [creditordebt, setCreditorDebt] = useState({
    debts: [],
    totalCreditors: "",
    totalDebts: "",
  });
  const getCreditorDebt = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const creditorDebt = res.data.data[0].Creditors_Debt;
        creditorDebt.forEach((obj) => {
          for (const key in obj) {
            if (obj[key] === null) {
              obj[key] = "";
            }
          }
        });
        setCreditorDebt({
          ...creditordebt,
          debts: creditorDebt,
          totalCreditors: res.data.data[0].Total_number_of_Creditors,
          totalDebts: res.data.data[0].Total_amount_of_Debt,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCreditorDebt();
  }, []);
  //
  const [modalVisible, setModalVisible] = useState(false);
  const [details, setDetails] = useState(null);
  const openModal = (item) => {
    setModalVisible(true);
    setDetails(item);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
      {user !== null ? (
        <>
          <div className="container p-2 mt-4">
            <h2 className="text-center">Your details</h2>

            <div className="w-100">
              <h3 className="fw-bold text-capitalize">Personal details:</h3>

              <div className="new-grid mt-2 mb-4">
                <div className="new-card">
                  <p>Name</p>
                  <h3>{user.Full_Name}</h3>
                </div>
                <div className="new-card">
                  <p>email address</p>
                  <h3 className="text-lowercase">{user.Email}</h3>
                </div>
                <div className="new-card">
                  <p>mobile number</p>
                  <h3>{user.Phone_Number}</h3>
                </div>
                <div className="new-card">
                  <p>Disposible income (DI)</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Disposable_Income_DI.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="address-span new-card">
                  <p>Address</p>
                  <h3>
                    {user.Flat_no_Building_Name +
                      ", " +
                      user.Street +
                      ", " +
                      user.State1 +
                      ", " +
                      user.City +
                      ", " +
                      user.Pincode_FA}
                  </h3>
                </div>
                <div className="new-card">
                  <p>accomodation status</p>
                  <h3>{user.Accommodation_Status_FA}</h3>
                </div>
                <div className="new-card">
                  <p>education status</p>
                  <h3>{user.Education_Status_FA}</h3>
                </div>
                <div className="new-card">
                  <p>Aadhar card number</p>
                  <h3>{user.Aadhar_card_FA}</h3>
                </div>
                <div className="new-card">
                  <p>PAN card number</p>
                  <h3 className="text-uppercase">{user.Pancard_FA}</h3>
                </div>
                <div className="new-card">
                  <p>Date of birth</p>
                  <h3>
                    {user.Date_of_Birth_FA.split("-").reverse().join("-")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>Age</p>
                  <h3>{user.Age_Of_Client} years</h3>
                </div>
                <div className="new-card">
                  <p>Marital status</p>
                  <h3>{user.Marital_Status_FA}</h3>
                </div>
                <div className="new-card">
                  <p>Number of children</p>
                  <h3>{user.Number_of_Children_FA}</h3>
                </div>
                <div className="new-card">
                  <p>account manager</p>
                  <h3>{user.Account_Manager.name}</h3>
                </div>
                <div className="new-card">
                  <p>employment status</p>
                  <h3>{user.Employment_Status}</h3>
                </div>

                <div className="new-card">
                  <p>Activity details</p>
                  <h3>
                    <a href={user.Lead_Activity_Details} target="_blank">
                      Visit <FaLink />
                    </a>
                  </h3>
                </div>
              </div>
            </div>

            <hr />

            <div className="w-100">
              <h3>Income:</h3>
              <div className="new-grid mt-2 mb-4">
                <div className="new-card">
                  <p>Wages per month</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Wage_Month_FA.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>Total income</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Total_Income_FA.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>Other income</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Other_Income_FA.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>income date</p>
                  <h3>
                    {user.Next_salary_payment_date.split("-")
                      .reverse()
                      .join("-")}
                  </h3>
                </div>
              </div>
            </div>

            <hr />

            <div className="w-100">
              <h3>Monthly expenditure:</h3>
              <div className="new-grid my-2">
                <div className="new-card">
                  <p>utilities</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Utilities.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>EMI</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.EMI.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>rent</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Rent.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>commute to work</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Commute_to_work_cost.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>Home loan</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Home_Loan.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>mobile.internet</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Mobile_Internet.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>medical fees</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Medical_Fees.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>total repair/maintenance</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Total_Repair_Maintenance.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>Education fees</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Education_fees.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>housekeeping food/maid</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Housekeeping_Food_Maid.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>other life/medical policies</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Other_Life_Medical_Policies.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>others</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Others.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>pension</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Pension.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>total cost for running car/bike</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Total_cost_for_running_Car_Bike.toLocaleString(
                      "en-IN"
                    )}
                  </h3>
                </div>
                <div className="new-card">
                  <p>telephone</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Telephone.toLocaleString("en-IN")}
                  </h3>
                </div>
                <div className="new-card">
                  <p>other secured loans</p>
                  <h3>
                    <LiaRupeeSignSolid />
                    {user.Other_Secure_Loan.toLocaleString("en-IN")}
                  </h3>
                </div>
              </div>
              <div className="new-card">
                <h3>
                  Total Income: <LiaRupeeSignSolid />
                  {user.Total_Income.toLocaleString("en-IN")}
                </h3>
                <h3>
                  Total expense: <LiaRupeeSignSolid />
                  {user.Total_Expenditure.toLocaleString("en-IN")}
                </h3>
                <h3>
                  Disposable income (DI): <LiaRupeeSignSolid />
                  {user.Disposable_Income_DI.toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            <hr />

            <div className="w-100">
              <div>
                <h3>My debts</h3>
              </div>

              <div className="new-card mt-2">
                <div>
                  <h3 className="fw-bold">
                    Total number of creditors: {creditordebt.totalCreditors}
                  </h3>
                </div>
                <div>
                  <h3 className="fw-bold">
                    Total amount of debts: <LiaRupeeSignSolid />
                    {creditordebt.totalDebts}
                  </h3>
                </div>
              </div>

              {creditordebt.debts.length === 0 ? (
                <p className="text-center py-4">No data found</p>
              ) : (
                <div className="new-grid mt-2 mb-4">
                  {creditordebt.debts.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="new-card"
                        onClick={() => openModal(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <p>
                          <span className="fw-bold">Creditor's name:</span>{" "}
                          {item.Creditors_Name.name}
                        </p>
                        <p>
                          <span className="fw-bold">Account number:</span>{" "}
                          {item.Account_number}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {/*  */}
      <div className={`custom-modal-container ${modalVisible ? "active" : ""}`}>
        <div className="custom-modal-background" onClick={closeModal}></div>
        <div className="custom-modal-box">
          <div className="header p-2">
            <p className="fw-bold text-capitalize">Creditor debt's details</p>
            <div style={{ cursor: "pointer" }} onClick={closeModal}>
              <FaTimes />
            </div>
          </div>
          <div className="body p-2">
            {details !== null && (
              <>
                <p>
                  <span className="fw-bold">Creditor's name:</span>{" "}
                  {details.Creditors_Name.name}
                </p>
                <p>
                  <span className="fw-bold">Type of credit:</span>{" "}
                  {details.Type_of_Credit}
                </p>
                <p>
                  <span className="fw-bold">Account number:</span>{" "}
                  {details.Account_number}
                </p>
                <p>
                  <span className="fw-bold">Balance O/S:</span>{" "}
                  <LiaRupeeSignSolid />
                  {details.Balance_O_S
                    ? details.Balance_O_S.toLocaleString("en-IN")
                    : "-"}
                </p>
                <p>
                  <span className="fw-bold">Current Monthly EMI:</span>{" "}
                  <LiaRupeeSignSolid />
                  {details.Current_Monthly_EMI
                    ? details.Current_Monthly_EMI.toLocaleString("en-IN")
                    : "-"}
                </p>
                <p>
                  <span className="fw-bold">Number Of Missed EMI:</span>{" "}
                  {details.No_of_Missed_EMI}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
