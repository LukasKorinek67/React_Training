import React, {useContext, useState} from "react";
import Icon from "@mdi/react";
import {mdiPencilOutline, mdiTrashCanOutline} from "@mdi/js";
import * as strings from "../text/strings";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Button} from "react-bootstrap";
import ConfirmationModal from "../modals/ConfirmationModal";
import EditRecipeModal from "../modals/EditRecipeModal";
import requestHandler from "../services/RequestHandler";
import {useData} from "../context/DataProvider";
import InformationModal from "../modals/InformationModal";
import UserContext from "../context/UserProvider";


export default function ModifyRecipeButtons({recipe}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { reloadData } = useData();
    const { isAuthorized } = useContext(UserContext);

    const showEdit = () => setShowEditModal(true);
    const closeEdit = () => setShowEditModal(false);
    const showDelete = () => setShowDeleteModal(true);
    const closeDelete = () => setShowDeleteModal(false);
    const showError = () => setShowErrorModal(true);
    const closeError = () => setShowErrorModal(false);

    const deleteRecipe = () => {
        const recipeId = {
            "id": recipe.id
        };
        requestHandler.deleteRecipe(recipeId)
            .then(async (response) => {
                console.log(response)
                if (response.status >= 400) {
                    //error
                    setShowDeleteModal(false);
                    showError();
                } else {
                    //success
                    reloadData();
                    setShowDeleteModal(false);
                }
            });
    }

    return (
        <>
            {isAuthorized &&
                <>
                    <ButtonGroup className="w-100" size="sm">
                        <Button variant="light" className="pe-3 text-dark" onClick={showEdit}>
                            <Icon path={mdiPencilOutline} size={0.8} className="me-1" />
                            {strings.EDIT}
                        </Button>
                        <Button variant="light" className="pe-3 text-dark" onClick={showDelete}>
                            <Icon path={mdiTrashCanOutline} size={0.8} className="me-1" />
                            {strings.DELETE}
                        </Button>
                    </ButtonGroup>
                    <EditRecipeModal
                        recipe={recipe}
                        show={showEditModal}
                        handleClose={closeEdit}
                        onComplete={reloadData}
                    />
                    <ConfirmationModal
                        show={showDeleteModal}
                        handleClose={closeDelete}
                        onConfirm={deleteRecipe}
                        title={strings.DELETE_MODAL_TITLE}
                        message={strings.DELETE_MODAL_MESSAGE}
                    />
                    <InformationModal
                        show={showErrorModal}
                        handleClose={closeError}
                        title={strings.ERROR_MODAL_TITLE}
                        message={strings.ERROR_MODAL_MESSAGE}
                    />
                </>
            }
        </>
    );
}