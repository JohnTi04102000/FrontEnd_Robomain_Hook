import React, { useEffect } from "react";
import { Modal } from "antd";
import { Image, Button, Space } from "antd";
import "./ModalViewAsset.scss";
import moment from "moment";

const ModalViewAsset = (props) => {
  let infoAsset = props.currentAsset;
  console.log("asset", infoAsset);

  useEffect(() => {}, [props.infoAsset]);
  return (
    <>
      <Modal
        title="Information asset"
        open={props.openInfo}
        onCancel={props.closeInfo}
        okButtonProps={{ style: { display: "none" } }}
        width={1000}
      >
        {infoAsset ? (
          <>
            <div className="detail-info">
              <div className="left-detail">
                <Image
                  src={`http://localhost:8080/image/${infoAsset.image}`}
                  key={infoAsset.id}
                />
              </div>
              <div className="right-detail">
                <div className="info-asset" key={infoAsset.id}>
                  <div className="name-asset">
                    ID Facility: {infoAsset.id_facitites}
                  </div>
                  <div className="price-asset">
                    <Space wrap>
                      <b>Import Day:</b>
                      <Button type="primary">
                        {" "}
                        {moment(infoAsset.manufacturerDate).format(
                          "DD-MM-YYYY"
                        )}
                      </Button>
                    </Space>
                  </div>
                  <br></br>
                  <p>
                    <b>Price:</b> {infoAsset.price}
                    <span className="price-underline">vnđ</span>
                  </p>
                  <p>
                    <b>Quantity:</b> {infoAsset.quantity}
                  </p>
                  <p>
                    <b>Type asset:</b> {infoAsset.type_asset}
                  </p>
                  <div className="other-detail">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>No content</>
        )}
      </Modal>
    </>
  );
};

export default ModalViewAsset;
