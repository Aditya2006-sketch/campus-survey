import { Issue } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MapPin, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const isSolved = issue.status === "Solved";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-transparent hover:border-l-primary group">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <Badge 
            variant={isSolved ? "default" : "outline"}
            className={cn(
              "mb-2",
              !isSolved && "border-accent text-accent-foreground bg-accent/10"
            )}
          >
            {issue.type}
          </Badge>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {issue.location}
          </h3>
        </div>
        {isSolved ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircle className="h-5 w-5 text-accent" />
        )}
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {issue.description}
        </p>
        
        {issue.imageUrl && (
          <div className="mt-3 relative h-32 w-full rounded-md overflow-hidden bg-muted/50">
            {/* Using a placeholder if URL is invalid, real app would handle this better */}
            <img 
              src={issue.imageUrl} 
              alt="Issue evidence"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex items-center gap-2">
        <Clock className="h-3 w-3" />
        {issue.createdAt && format(new Date(issue.createdAt), "MMM d, yyyy • h:mm a")}
      </CardFooter>
    </Card>
  );
}
