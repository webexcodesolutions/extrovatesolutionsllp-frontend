"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// const cities = [
//   {
//     value: "mumbai",
//     label: "Mumbai",
//   },
//   {
//     value: "delhi",
//     label: "Delhi",
//   },
//   {
//     value: "bangalore",
//     label: "Bangalore",
//   },
//   {
//     value: "hyderabad",
//     label: "Hyderabad",
//   },
//   {
//     value: "pune",
//     label: "Pune",
//   },
// ];

export function SearchableSelect({
  items,
  label,
}: {
  items: { value: string; label: string }[];
  label: string | "Select";
}) {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-12 w-full justify-between"
        >
          {value ? items.find((city) => city.value === value)?.label : label}

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 bg-background">
        <Command>
          <CommandInput placeholder="Search" />

          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>

            <CommandGroup>
              {items.map((v) => (
                <CommandItem
                  key={v.value}
                  value={v.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue);

                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2",
                      value === v.value ? "opacity-100" : "opacity-0",
                    )}
                  />

                  {v.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
