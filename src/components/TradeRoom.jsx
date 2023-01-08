import React, {useState} from "react";
import TableComponent from "./TableComponent.jsx";
import {Button, Modal} from "react-bootstrap";
import {useSocket} from "../contexts/index.js";

export default function TradeRoom() {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const socket = useSocket();
  return (
    <>
      <Button variant="primary" onClick={openModal} className="m-5">
        Открыть комнату торгов
      </Button>
      <Modal
        show={show}
        fullscreen={true}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fs-4 pb-4">
            Ход торгов <b>Тестовые торги на аппарат ЛОТОС №2033564(09.11.2020 07:00)</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex-grow-0 pb-0">
          <span className="text-danger bg-secondary bg-opacity-10">
            Уважаемые участники, во время вашего хода вы можете изменить параметры торгов, указанных в таблице:
          </span>
          <TableComponent/>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <span>
            Действия:
          </span>
          <div className="d-flex gap-1">
            <Button variant="primary" onClick={socket.switchActiveCompany}>
              Следующий
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Закрыть
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

