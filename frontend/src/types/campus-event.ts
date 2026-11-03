export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Formdaki değerler: id yok, input hep metin verdiği için capacity string
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

// Her alana en fazla bir hata mesajı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
