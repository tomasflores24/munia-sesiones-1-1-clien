import { useState } from "react";
import PropTypes from "prop-types";

import MembershipBox from "./MembershipBox/MembershipBox";
import "./SelectMembershipStyle.scss";
import { basic, company, standard } from "../../../../utils/membershipsData";
import { useMutation } from "react-query";
import { PurchasesServices } from "../../../../services/dashboard/purchases/purchases.services";

export const MembershipTypes = {
  BASIC: "BASIC",
  STANDARD: "STANDARD",
  COMPANY: "COMPANY",
};

const SelectMembership = ({ companyId }) => {
  const [selectedMembership, setSelectedMembership] = useState(
    MembershipTypes.BASIC
  );

  const { mutate } = useMutation(
    ["purchase"],
    PurchasesServices.createPurchase
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
        <MembershipBox
          price={basic.price}
          title={basic.title}
          list={basic.list}
          titleBgColor={basic.titleBgColor}
          selected={selectedMembership === MembershipTypes.BASIC}
          selectMembership={() => selectMembership(MembershipTypes.BASIC)}
        />
        <MembershipBox
          price={standard.price}
          title={standard.title}
          list={standard.list}
          titleBgColor={standard.titleBgColor}
          selected={selectedMembership === MembershipTypes.STANDARD}
          selectMembership={() => selectMembership(MembershipTypes.STANDARD)}
        />
        <MembershipBox
          price={company.price}
          title={company.title}
          list={company.list}
          titleBgColor={company.titleBgColor}
          description={company.description}
          selected={selectedMembership === MembershipTypes.COMPANY}
          selectMembership={() => selectMembership(MembershipTypes.COMPANY)}
        />
      </div>
      <div className="action__buttons">
        <button
          type="submit"
          className="selectMembership__btn"
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
};

export default SelectMembership;
