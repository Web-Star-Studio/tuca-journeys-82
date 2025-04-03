
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../types";
import TitleDescription from "./basic-info/TitleDescription";
import PriceRatingInputs from "./basic-info/PriceRatingInputs";
import DurationPersonsInputs from "./basic-info/DurationPersonsInputs";
import CategorySelect from "./basic-info/CategorySelect";
import ImagePreview from "./basic-info/ImagePreview";

interface BasicInfoFormProps {
  form: UseFormReturn<PackageFormValues>;
  previewUrl: string;
}

const BasicInfoForm = ({ form, previewUrl }: BasicInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <TitleDescription form={form} />
        <PriceRatingInputs form={form} />
        <DurationPersonsInputs form={form} />
        <CategorySelect form={form} />
      </div>
      
      <div>
        <ImagePreview form={form} previewUrl={previewUrl} />
      </div>
    </div>
  );
};

export default BasicInfoForm;
