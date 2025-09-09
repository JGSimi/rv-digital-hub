import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MobileCardProps {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive";
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function MobileCard({
  title,
  subtitle,
  content,
  actions,
  className,
  children,
  onClick,
}: MobileCardProps) {
  return (
    <Card 
      className={cn("shadow-card hover:shadow-elegant transition-all duration-300", onClick && "cursor-pointer", className)}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {actions && actions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={action.onClick}
                      className={cn(
                        action.variant === "destructive" && 
                        "text-destructive focus:text-destructive"
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4 mr-2" />}
                      {action.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      {(content || children) && (
        <CardContent className="pt-0">
          {content}
          {children}
        </CardContent>
      )}
    </Card>
  );
}