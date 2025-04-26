export interface Appointment {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    patient_id?: User | null;
    doctor_id?: User[] | null;
    clinic_hospital_id?: ClinicsHospital | null;
    appointment_date?: Date | string;
    appointment_type?: "in-person" | "video" | "emergency";
    appointment_status?: "pending" | "confirmed" | "completed" | "cancelled";
    payment_status?: "pending" | "paid" | "failed";
  };
  
  export interface ClinicsHospital {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    name: string;
    address?: string;
    phone?: number;
    email?: string;
    type?: "clinic" | "hospital";
  };
  
  export interface Doctor {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    specialization?: string;
    experienc?: number;
    consultation_fee?: number;
    available_online?: boolean;
    users?: User | null;
    clinics_hospitals?: ClinicsHospital[] | null;
  };
  
  export interface DoctorAvailability {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    doctor_id?: User | null;
    day_of_week?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    start_time: Date | string;
    end_time: Date | string;
    is_available?: boolean;
  };
  
  export interface Payment {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string;
    locale?: string | null;
    appointment_id?: Appointment | null;
    patient_id?: User | null;
    amount: number;
    payment_method?: "card" | "upi" | "wallet" | "cash";
    payment_status?: "pending" | "completed" | "failed";
    transaction_id?: string;
  };
  
  export interface Media {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface MediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string;
    url: string;
  }
  
  export interface User {
    id?: number;
    username: string;
    email: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role: Role | null | number;
  };
  
  export interface Registeruser {
    full_name?:string;
    username?: string;
    email?: string;
    provider?: string;
    password?: string;
    phone?: number;
    address?: string;
    gender?:string
  };

  export interface LoginUser{
    identifier:string;
    password:string;
    remeber:boolean;
  }
  
  export interface Role {
    id?: number;
    documentId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    name: string;
    description: string;
    type: string;
  };
  
  export interface FindOne<T> {
    data: T;
    meta: {
      pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    };
  };
  
  export interface FindMany<T> {
    data: T[];
    meta: {
      pagination?: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    };
  };
  