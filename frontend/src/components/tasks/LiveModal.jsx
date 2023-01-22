import React from "react";
import { Modal, Button } from "flowbite-react";
const LiveModal = ({ showLive, setShowLive, handleLive }) => {
  return (
    <>
      {" "}
      <Modal show={showLive} onClose={() => setShowLive(false)}>
        <Modal.Header>Start Live Study Session</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your partners will receive a link to your live
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Make sure you have invited a partner and that they have accepted
              your invitation to be study buddies.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleLive}>Put Me Live</Button>
          <Button color="gray" onClick={() => setShowLive(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LiveModal;
