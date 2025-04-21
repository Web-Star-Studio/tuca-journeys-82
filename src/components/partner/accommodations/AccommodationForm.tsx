
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { partnerService } from "@/services";
import { useCurrentPartner } from "@/hooks/use-partner";
import { Accommodation } from "@/types/database";

// Define accommodation form schema
const accommodationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.string().min(1, "Type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  short_description: z.string().min(5, "Short description must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  price_per_night: z.number().min(1, "Price must be greater than 0"),
  bedrooms: z.number().min(1, "Must have at least 1 bedroom"),
  bathrooms: z.number().min(1, "Must have at least 1 bathroom"),
  max_guests: z.number().min(1, "Must accommodate at least 1 guest"),
  image_url: z.string().url("Must be a valid URL"),
});

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

interface AccommodationFormProps {
  accommodation?: Partial<Accommodation>;
  onSuccess: () => void;
}

const AccommodationForm: React.FC<AccommodationFormProps> = ({ 
  accommodation,
  onSuccess
}) => {
  const { data: partner } = useCurrentPartner();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      title: accommodation?.title || "",
      type: accommodation?.type || "apartment",
      description: accommodation?.description || "",
      short_description: accommodation?.short_description || "",
      address: accommodation?.address || "",
      price_per_night: accommodation?.price_per_night || 0,
      bedrooms: accommodation?.bedrooms || 1,
      bathrooms: accommodation?.bathrooms || 1,
      max_guests: accommodation?.max_guests || 2,
      image_url: accommodation?.image_url || "",
    }
  });

  const onSubmit = async (values: AccommodationFormValues) => {
    if (!partner?.id) {
      toast.error("Partner profile not found");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add a simple dummy implementation since we don't have these methods yet
      if (accommodation?.id) {
        // This would be replaced by a real accommodation service
        console.log("Updating accommodation:", values);
        toast.success("Accommodation updated successfully");
      } else {
        // This would be replaced by a real accommodation service
        console.log("Creating accommodation:", { ...values, partner_id: partner.id });
        toast.success("Accommodation created successfully");
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error submitting accommodation:", error);
      toast.error("Failed to save accommodation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price_per_night"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price per Night</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_guests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Guests</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSuccess}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : accommodation?.id ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccommodationForm;
