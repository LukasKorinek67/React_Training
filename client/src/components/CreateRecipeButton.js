import React, {useContext, useState} from "react";
import Icon from "@mdi/react";
import {mdiPlus} from "@mdi/js";
import * as strings from "../text/strings";
import {Button} from "react-bootstrap";
import CreateRecipeModal from "../modals/CreateRecipeModal";
import { useQueryClient } from '@tanstack/react-query';
import UserContext from "../context/UserProvider";
import {queryKeys} from "../queries/queryKeys";


export default function CreateRecipeButton() {
    const [showModal, setShowModal] = useState(false);
    const { isAuthorized } = useContext(UserContext);
    const queryClient = useQueryClient();

    const show = () => setShowModal(true);
    const close = () => setShowModal(false);

    const reloadData = () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.recipes });
        queryClient.invalidateQueries({ queryKey: queryKeys.ingredients });
    };

    return (
        <>
            {isAuthorized &&
                <>
                    <div className="d-flex">
                        <Button className="ms-auto mt-2 me-4" size="sm" variant="outline-dark" onClick={show}>
                            <Icon size={0.8} path={mdiPlus} className="me-1 pb-1"/>
                            {strings.CREATE_RECIPE}
                        </Button>
                    </div>
                    <CreateRecipeModal show={showModal} handleClose={close} onComplete={reloadData}/>
                </>
            }
        </>
    );
}