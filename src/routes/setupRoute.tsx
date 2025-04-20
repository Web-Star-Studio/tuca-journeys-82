
import React from "react";
import { Route } from "react-router-dom";
import SetupPage from "@/pages/SetupPage";

export const setupRoute = (
  <Route path="/setup" element={<SetupPage />} />
);
