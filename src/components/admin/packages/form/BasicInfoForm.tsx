
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PackageFormValues } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TitleDescription from "./basic-info/TitleDescription";
import ImagePreview from "./basic-info/ImagePreview";
import DurationPersonsInputs from "./basic-info/DurationPersonsInputs";
import PriceRatingInputs from "./basic-info/PriceRatingInputs";
import CategorySelect from "./basic-info/CategorySelect";
import { getPackageCategories } from "@/data/packages";

interface BasicInfoFormProps {
  form: UseFormReturn<PackageFormValues>;
  previewUrl: string;
}

const BasicInfoForm = ({ form, previewUrl }: BasicInfoFormProps) => {
  const categories = getPackageCategories();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <TitleDescription form={form} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <ImagePreview form={form} previewUrl={previewUrl} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <CategorySelect form={form} categories={categories} />
          <DurationPersonsInputs form={form} />
          <PriceRatingInputs form={form} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoForm;
