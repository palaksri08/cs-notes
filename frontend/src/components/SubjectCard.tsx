import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CreditCard as Cards, FileText, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    description: string;
    noteCount: number;
    flashcardCount: number;
    color: string;
    lastStudied?: string;
  };
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: subject.color }}
            >
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{subject.name}</CardTitle>
              {subject.lastStudied && (
                <p className="text-xs text-muted-foreground">
                  Last studied {subject.lastStudied}
                </p>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Subject</DropdownMenuItem>
              <DropdownMenuItem>Export Notes</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{subject.description}</p>
        
        <div className="flex space-x-2">
          <Badge variant="secondary" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            {subject.noteCount} notes
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Cards className="h-3 w-3 mr-1" />
            {subject.flashcardCount} cards
          </Badge>
        </div>
        
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </Button>
          <Button variant="study" size="sm" className="flex-1">
            <Cards className="h-4 w-4 mr-2" />
            Study
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;