export interface Beer {
  BeerId: number;
  Name: string;
  Brand: string;
  Country: string;
  AlcoholPercentage: number;
  IBU: number | null;
  SizeMl: number;
  Price: number;
  IsActive: boolean;
  CreatedAt: Date;
  UpdatedAt: Date | null;
}
