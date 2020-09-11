import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPagePro = () => {
  return (
    <MDBFooter color="unique-color-white" className="page-footer font-small pt-0">

      < div style={{ backgroundColor: "#E7D197", padding: "25px", margin: "20px", }}>

        <MDBContainer className="mt-5 mb-4 text-center text-md-left">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mb-4">
              <h6 className="text-uppercase font-weight-bold">
                <strong><i>S.M.U - Student Managment Utility</i></strong>
              </h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
              <p>
                <i>Student Management Utility</i>, also known as <i>SMU</i>, is a simple & initiative
            website
            designed to prepare and assist up and coming coders in their career search. We put together a section for
            users to browse jobs, coding related videos, current event breaking news, and a personalized note tab to
            keep yourself organized during your job search.
            </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mb-4">
              {/* collum to add data later if needed be */}
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="mb-4">
              <h6 className="text-uppercase font-weight-bold">
                <strong>Useful Links</strong>
              </h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "80px" }} />
              <p>
                <a target="_blank" rel="noopener noreferrer" href="http://blog.thefirehoseproject.com/posts/14-tips-to-successfully-start-a-career-in-coding/">14 Tips to Successfully Start a Career in Coding</a>
              </p>
              <p>
                <a target="_blank" rel="noopener noreferrer" href="https://insights.dice.com/2019/12/12/full-stack-developer-job-interview-tips/">Full Stack Developer Job Interview: Tips and Tricks to Win</a>
              </p>
              <p>
                <a target="_blank" rel="noopener noreferrer" href="https://www.toptal.com/full-stack/interview-questions">10 Essential Full Stack Interview Questions</a>
              </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className="mb-4">
              {/* collum to add data later if needed be */}
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mb-4">
              <h6 className="text-uppercase font-weight-bold">
                <strong>Contact</strong>
              </h6>
              <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "80px" }} />
              <p>
                <i className="fa fa-home mr-3" /> Dallas, TX ZIP, US
            </p> <br></br>
              <p>
                <i className="fa fa-envelope mr-3" /> StudentManUtility@gmail.com
            </p>
              <p>
                <i className="fa fa-phone mr-3" /> +1 (469) 345-0000
            </p>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://github.com/KenanDeari/proj-3"> S.M.U - Student Managment Utility</a>
          </MDBContainer>
        </div>
      </div >
    </MDBFooter >
  );
}

export default FooterPagePro;