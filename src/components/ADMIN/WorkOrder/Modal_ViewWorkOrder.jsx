import React from "react";
import { Modal } from "antd";

const ModalViewWorkOrder = (props) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        open={props.isOpenModalEdit}
        onCancel={props.handleModalEdit}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalViewWorkOrder;
