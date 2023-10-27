import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

import MembershipBox from "./MembershipBox/MembershipBox";
import "./SelectMembershipStyle.scss";
import { basic, company, standard } from "../../../../utils/membershipsData";
import { useMutation, useQuery } from "react-query";
import { PurchasesServices } from "../../../../services/dashboard/purchases/purchases.services";
import { MembershipsServices } from "../../../../services/dashboard/memberships/memberships.services";
import LoadingSpinner from "../../../loadingSpinner/LoadingSpinner";
import { Alert } from "@mui/material";

export const MembershipTypes = {
  BASIC: 1,
  STANDARD: 2,
  COMPANY: 3,
};

const SelectMembership = ({ companyId, closeModal, setStep, refetch }) => {
  const [selectedMembership, setSelectedMembership] = useState();

  const { isLoading, data, isSuccess } = useQuery(
    ["getMemberships"],
    MembershipsServices.getAllMemberships
  );

  const { mutate } = useMutation(
    ["purchase"],
    PurchasesServices.createPurchase,
    {
      onSuccess: () => {
        toast.success("¡Compra de membresia exitosa!");
        refetch();
        closeModal();
        setTimeout(() => {
          setStep(0);
        }, [1000]);
      },
      onError: (err) => {
        toast.error(err.message || "Algo salio mal.");
      },
    }
  );

  const selectMembership = (type) => {
    setSelectedMembership(type);
  };

  const onSubmit = () => {
    mutate({
      purchased_sessions: 10,
      amountHistory: 500,
      CompanyId: companyId,
      MembershipId: selectedMembership,
    });
  };

  return (
    <div className="selectMembership__root">
      <h2 className="title">
        Seleccionar <span>membresia del cliente</span>
      </h2>
      <div className="selectMembership__container">
        {isLoading ? (
          <LoadingSpinner />
        ) : !isLoading && isSuccess ? (
          <>
            {data?.data.map((el) => (
              <MembershipBox
                key={el.id}
                price={`$${el.amount}`}
                title={el.name}
                list={basic.list}
                titleBgColor={
                  el.id % 2 === 0 ? company.titleBgColor : basic.titleBgColor
                }
                selected={selectedMembership?.id === el.id}
                selectMembership={() => selectMembership(el)}
              />
            ))}
          </>
        ) : (
          <Alert severity="error" className="full-width">
            Ha ocurrido un error obteniendo las membresias
          </Alert>
        )}
      </div>
      <div className="action__buttons">
        <button
          type="submit"
          className="selectMembership__btn"
          disabled={!isSuccess}
          onClick={onSubmit}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

SelectMembership.propTypes = {
  companyId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  setStep: PropTypes.func,
  refetch: PropTypes.func,
};

export default SelectMembership;
