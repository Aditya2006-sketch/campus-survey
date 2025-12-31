import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertRaggingReport } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateRaggingReport() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRaggingReport) => {
      const res = await fetch(api.ragging.create.path, {
        method: api.ragging.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to submit report");
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Report Submitted",
        description: "Your report has been received securely.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message,
      });
    },
  });
}
