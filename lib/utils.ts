import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',   // full weekday name (e.g., 'Monday')
    month: 'long',     // full month name (e.g., 'October')
    day: 'numeric',    // numeric day of the month (e.g., '25')
    hour: 'numeric',   // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true,      // use 12-hour clock (true) or 24-hour clock (false)
  };

  const date = new Date(dateString);
  const formattedDateTime: string = date.toLocaleString('fr-FR', dateTimeOptions);

  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat('fr-FR', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return {
    dateTime: `${formattedDate} à ${formattedTime}`,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)