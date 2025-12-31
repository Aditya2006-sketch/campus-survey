import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertIssue, type Issue } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useIssues() {
  return useQuery<Issue[]>({
    queryKey: [api.issues.list.path],
    queryFn: async () => {
      const res = await fetch(api.issues.list.path);
      if (!res.ok) throw new Error("Failed to fetch issues");
      return await res.json();
    },
  });
}

export function useCreateIssue() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertIssue) => {
      const res = await fetch(api.issues.create.path, {
        method: api.issues.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to report issue");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.issues.list.path] });
      toast({
        title: "Issue Reported",
        description: "Maintenance team has been notified.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}
