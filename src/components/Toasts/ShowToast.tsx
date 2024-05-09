import React from "react";
import { Toast } from "react-bootstrap";
import { useToast } from "../../ToastContext";

function BootstrapToast() {
  const { show, message, variant, hideToast } = useToast();

  return (
    <div style={{ position: "absolute", top: 0, right: 0 }}>
      <Toast show={show} onClose={hideToast} delay={3000} autohide bg={variant}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default BootstrapToast;
