import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRaggingReportSchema } from "@shared/schema";
import { useCreateRaggingReport } from "@/hooks/use-ragging";
import { useLocation } from "wouter";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert } from "lucide-react";

export default function RaggingReport() {
  const [, setLocation] = useLocation();
  const createReport = useCreateRaggingReport();

  const form = useForm<z.infer<typeof insertRaggingReportSchema>>({
    resolver: zodResolver(insertRaggingReportSchema),
    defaultValues: {
      victimName: "",
      location: "",
      description: "",
      imageUrl: "",
      isAnonymous: false,
    },
  });

  const onSubmit = (data: z.infer<typeof insertRaggingReportSchema>) => {
    createReport.mutate(data, {
      onSuccess: () => {
        setLocation("/");
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-xl mb-8 flex gap-4 items-start">
        <ShieldAlert className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
        <div>
          <h2 className="font-bold text-destructive text-lg">Anti-Ragging Initiative</h2>
          <p className="text-sm text-destructive/80">
            KITS Ramtek has a zero-tolerance policy towards ragging. All reports are treated with urgency and strict confidentiality. 
            You can choose to remain anonymous.
          </p>
        </div>
      </div>

      <div className="bg-card p-6 md:p-8 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold font-display mb-6">File a Ragging Complaint</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="victimName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Victim Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of student being harassed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location of Incident</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Boys Hostel, Canteen" {...field} />
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
                  <FormLabel>Incident Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe what happened, including dates and times if possible..." 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidence URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Link to image/video/screenshot" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Keep my identity anonymous
                    </FormLabel>
                    <FormDescription>
                      If checked, your name will not be shared with the committee initially.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-4 flex justify-end">
              <Button 
                type="submit" 
                variant="destructive"
                className="w-full sm:w-auto"
                disabled={createReport.isPending}
              >
                {createReport.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Confidential Report
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}
