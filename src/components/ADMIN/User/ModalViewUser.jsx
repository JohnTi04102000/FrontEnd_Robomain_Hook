import React, { useEffect } from "react";
import { Modal } from "antd";
import { Image, Button, Space } from "antd";
import "./ModalViewUser.scss";

const ModalViewUser = (props) => {
  let infoUser = props.currentUser;
  console.log("user: " + infoUser);

  useEffect(() => {}, [props.infoUser]);
  return (
    <>
      <Modal
        title="Information user"
        open={props.openInfo}
        onCancel={props.closeInfo}
        okButtonProps={{ style: { display: "none" } }}
        width={1000}
      >
        {infoUser ? (
          <>
            <div className="detail-info">
              <div className="left-detail">
                <Image
                  src={`http://103.98.160.26:1010/image/${infoUser.image}`}
                  key={infoUser.id}
                />
              </div>
              <div className="right-detail">
                <div className="info-user" key={infoUser.id}>
                  <div className="name-user">Name: {infoUser.name_User}</div>
                  <div className="price-user">
                    <Space wrap>
                      <b>Birthday:</b>
                      <Button type="primary">
                      {infoUser.birth}
                      </Button>
                    </Space>
                  </div>
                  <br></br>
                  <p>
                    <b>Role user:</b> {infoUser.role_User}
                  </p>
                  <p>
                    <b>Gender:</b> {infoUser.sex}
                  </p>
                  <div className="other-detail">
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>No information</>
        )}
      </Modal>
    </>
  );
};

export default ModalViewUser;
