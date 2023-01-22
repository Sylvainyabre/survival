import React from 'react';
import { Button, Modal, Textarea, Label, TextInput } from "flowbite-react";

const TextModal = ({
  showTextBox,
  setShowTextBox,
  handleSend
}) => {
  return <>
    <Modal show={showTextBox} size="md" popup={true} onClose={() => setShowTextBox(false)}>
    <Modal.Header />
    <Modal.Body>
      <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Send a message to your study partner.
        </h3>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="subject" value="Subject of your message" />
          </div>
          <TextInput id="subject" placeholder="short subject" required={true} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="message" value="Your message" />
          </div>
          <Textarea id="message" type="text" required={true} />
        </div>
    
        <div className="w-full">
          <Button onChange={handleSend}>
           Send Message
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
    
    </>;
};

export default TextModal;