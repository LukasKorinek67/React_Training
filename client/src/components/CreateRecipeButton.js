import React, {useState} from "react";
import Icon from "@mdi/react";
import {mdiPlus} from "@mdi/js";
import * as strings from "../text/strings";
import {Button} from "react-bootstrap";
import CreateRecipeModal from "../modals/CreateRecipeModal";


export default function CreateRecipeButton() {
    const [showModal, setShowModal] = useState(false);

    const show = () => setShowModal(true);
    const close = () => setShowModal(false);



    return (
        <>
            <div className="d-flex">
                <Button className="ms-auto mt-2 me-4" size="sm" variant="outline-dark" onClick={show}>
                    <Icon size={0.8} path={mdiPlus} className="me-1 pb-1"/>
                    {strings.CREATE_RECIPE}
                </Button>
            </div>
            <CreateRecipeModal show={showModal} handleClose={close}/>
        </>
    );
}