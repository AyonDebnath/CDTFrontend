import AppointmentForm from "../features/appointment/AppointmentForm";
import PageTitle from "../features/user-body/PageTitle";

import React from "react";

export default function AppointmentCenter() {
  return (
    <>
      <PageTitle pageName="Appointment Center" />
      <AppointmentForm />
    </>
  );
}
