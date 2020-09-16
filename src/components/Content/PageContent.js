import React from "react";
import { connect } from "react-redux";

import TimeLine from "../Common/TimeLine";
const PageContent = ({ data }) => {
  const { basic, pic, content } = data;
  console.log(data);

  let desc = "";
  let pici = "";
  if (basic && basic.length > 0) {
    desc = basic.find((x) => x.field === "desC").val || "";
  }
  if (pic && pic.length > 0) {
    pici = pic[0].base64;
  }
  return (
    <>
      <div className="container pt-3">
        <div className="row justify-content-md-center">
          <div className="col-sm-9 ">
            <div className="site-section-heading text-left mb-5 w-border">
              <div className="text-center">
                {pici && (
                  <img
                    alt="cmsImage"
                    className="img-center img-fluid"
                    src={pici}
                  />
                )}
              </div>
              <br />
              {desc && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: desc.replace(/\n/g, "<br />"),
                  }}
                />
              )}

              {content &&
                content.map((item, i) => (
                  <div>
                    <h5>{item.title}</h5>
                    {item.type === "timeline" && (
                      <TimeLine data={item.data}></TimeLine>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect((state) => ({}), {})(PageContent);
