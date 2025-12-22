import React, {useContext, useState} from "react";
import Icon from "@mdi/react";
import {mdiPencilOutline, mdiTrashCanOutline} from "@mdi/js";
import * as strings from "../text/strings";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Button} from "react-bootstrap";
import ConfirmationModal from "../modals/ConfirmationModal";
import EditRecipeModal from "../modals/EditRecipeModal";
import InformationModal from "../modals/InformationModal";
import UserContext from "../context/UserProvider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "../queries/queryKeys";
import {deleteRecipe} from "../api/recipesRequests";


export default function ModifyRecipeButtons({recipe}) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const { isAuthorized } = useContext(UserContext);
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (recipeId) => deleteRecipe(recipeId),
        onSuccess: () => {
            reloadData();
            setShowDeleteModal(false);
        },
        onError: () => {
            setShowDeleteModal(false);
            showError();
        },
    })

    const showEdit = () => setShowEditModal(true);
    const closeEdit = () => setShowEditModal(false);
    const showDelete = () => setShowDeleteModal(true);
    const closeDelete = () => setShowDeleteModal(false);
    const showError = () => setShowErrorModal(true);
    const closeError = () => setShowErrorModal(false);

    const reloadData = () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.recipes });
        queryClient.invalidateQueries({ queryKey: queryKeys.ingredients });
    };

    const handleDeleteRecipe = () => {
        const recipeId = {
            "id": recipe.id
        };
        mutate(recipeId);
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
                        onConfirm={handleDeleteRecipe}
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