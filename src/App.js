import React, { useState } from "react";
import * as xlsx from "xlsx";
import "./App.css";
// npm install xlsx
import Paginations from "./components/Paginations";

function App() {
  const [excelData, setExcelData] = useState([]);
  const [searchData, setSearchData] = useState("");
  //const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const readExcel = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer(file);
    const excelfile = xlsx.read(data);
    const excelsheet = excelfile.Sheets[excelfile.SheetNames[0]];
    const exceljson = xlsx.utils.sheet_to_json(excelsheet);
    //console.log(exceljson);
    setExcelData(exceljson);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = excelData.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container content">
        <div className="row fthight">
          <div className="col-md-8 ">
            <form>
              <input
                className="form-control my-3"
                placeholder="Search here"
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
              />
            </form>

            <h3 className="mt-3">Excel Data in React js</h3>
            <input
              type="file"
              className="form-control"
              onChange={(e) => readExcel(e)}
            />
          </div>

          <div className="col-md-12 mt-3">
            {currentPosts.length > 1 && (
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th>Sr. No</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Age</th>
                    <th>PhoneNo.</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPosts
                    .filter((val) => {
                      if (searchData === "") {
                        return val;
                      } else if (
                        val.FirstName.toLowerCase().includes(
                          searchData.toLocaleLowerCase()
                        ) ||
                        val.LastName.toLowerCase().includes(
                          searchData.toLocaleLowerCase()
                        ) ||
                        val.City.toLowerCase().includes(
                          searchData.toLocaleLowerCase()
                        ) ||
                        val.Country.toLowerCase().includes(
                          searchData.toLocaleLowerCase()
                        )
                      ) {
                        return val;
                      }
                    })
                    .map((getdata, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{getdata.FirstName} </td>
                        <td>{getdata.LastName} </td>
                        <td>{getdata.Gender} </td>
                        <td>{getdata.City} </td>
                        <td>{getdata.Age} </td>
                        <td>{getdata.PhoneNo} </td>
                        <td>{getdata.Country} </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <Paginations
          postsPerPage={postsPerPage}
          totalPosts={excelData.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}
export default App;
